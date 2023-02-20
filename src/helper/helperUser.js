import axios from "axios";
import jwt_decode from "jwt-decode";

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN
axios.defaults.baseURL = import.meta.env.VITE_API_SERVER_DOMAIN;

/** make api request */

/** To get username from Token */
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find Token");
  let decode = jwt_decode(token);
  return decode;
}

/** authenticate function */
export async function authenticate(username) {
  try {
    return await axios.post("api/authenticate", { username });
  } catch (error) {
    return { error: "username does't exist" };
  }
}

/** get user details  */

export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "username does't exist" };
  }
}

/** register user */

export async function registerUser(credentials) {
  try {
    let { username, email } = credentials;
    console.log(username, email);

    const {
      data: { code },
      status,
    } = await axios.get("api/generateOtp");
    let sentcode = code;
    let text = `Your account verification OTP is ${code}. Verify and enjoy with us.`;
    if (status === 201) {
      const { status } = await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "verification mail",
      });
      console.log(status);
      if (status === 200) {
        const {
          data: { message },
          status,
        } = await axios.post("api/register", { credentials, sentcode });
      }
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** login */

export async function verifyUser({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("api/login", { username, password });

      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't macth" });
  }
}

/** update user profile */

export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("api/updateUser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "couldn't update profile" });
  }
}
/** Generate OTP */

export async function generateOtp(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("api/generateOtp", { params: { username } });

    // send mail with the OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password`;
      await axios.post("api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "password recovery otp",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function verifyOtp({ username, code }) {
  try {
    const { data, status } = await axios.get("api/verifyOtp", {
      params: { username, code, sentcode },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put("api/resetPassword", {
      username,
      password,
    });

    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function registerOtpVerify({ code, userName }) {
  try {
    await axios.post("api/verifyuser", { code, userName });
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function getFilteredData(game) {
  try {
    const {
      data: { turfs },
    } = await axios.get(`api/filterd/${game}`);
    console.log(turfs);
    return turfs;
  } catch (error) {
    return Promise.reject({ error });
  }
}


export async function checkout(amount, slot, game, id) {
  try {
    const {
      data: { order },
    } = await axios.post("api/checkout", { amount, slot, game, id });
    return order;
  } catch (error) {
    return Promise.reject({ error });
  }
}
