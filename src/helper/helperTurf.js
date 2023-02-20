import axios from "axios";
import { CgLayoutGrid } from "react-icons/cg";
axios.defaults.baseURL = import.meta.env.VITE_API_SERVER_DOMAIN;

export async function RegisterAdmin(credentials) {
  try {
    await axios.post("/api/turfAdmin/register", credentials);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function AddTr(values, id) {
  try {
    const {
      data: { result },
    } = await axios.post("/api/turfAdmin/addTurf", { values, id });
    return result;
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function verifyOtp(email, otp) {
  try {
    await axios.post("/api/turfAdmin/otpVerify", { email, otp });
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function resent(email) {
  try {
    await axios.post("/api/turfAdmin/resentOtp", { email });
  } catch (error) {
    console.log(error);
  }
}

export async function forgotpsw(credentials) {
  try {
    await axios.post("/api/turfAdmin/forgotPassword", credentials);
  } catch (error) {
    console.log(error);
  }
}

export async function changePassword(email, password) {
  try {
    console.log(email, password);
    await axios.post("/api/turfAdmin/resetPassword", { email, password });
  } catch (error) {
    console.log(error);
  }
}

export async function getAllturf(admin) {
  try {
    console.log("hey");
    const {
      data: { turfs },
    } = await axios.get("/api/turfAdmin/getAllturf", {
      headers: { id: admin._id },
    });

    return turfs;
  } catch (error) {
    console.log(error);
  }
}

export async function getOneTurf(id) {
  try {
    const {
      data: { turfs },
    } = await axios.get(`/api/turfAdmin/get/${id}`);
    return turfs;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTurf(id) {
  try {
    await axios.put(`/api/turfAdmin/deleteTurf/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export async function addLocation({ id, lat, long }) {
  try {
    const { status } = await axios.put("/api/turfAdmin/addLocation", {
      id,
      lat,
      long,
    });
    return status;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProfile(credentials) {
  try {
    console.log(credentials);
    await axios.put("/api/turfAdmin/updateProfile", credentials);
  } catch (error) {
    console.log(error);
  }
}

export async function getTurfAdmin(id) {
  try {
    console.log(id);
    const {
      data: { user },
    } = await axios.get(`/api/turfAdmin/getTurfAdmin/${id}`);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function editTurf(values, id) {
  try {
    await axios.put("api/turfAdmin/editTurf", { values, id });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteImg(id, deleteUrl) {
  try {
    await axios.put("api/turfAdmin/deleteImg", { id, deleteUrl });
  } catch (error) {
    console.log(error);
  }
}

export async function addSlot(id, slot, date, play) {
  try {
    await axios.post("api/turfAdmin/addTimeslot", { id,slot, date, play });
  } catch (error) {
    console.log(error);
  }
}

export async function getSlot(id, game, date) {
  try {
    const {
      data: { slot },
    } = await axios.get(`api/turfAdmin/getSlot/${date}`, {
      headers: {
        id: id,
        game: game,
      },
    });
    return slot;
  } catch (error) {
    console.log(error);
  }
}
