import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_SERVER_DOMAIN;

export async function getAllUsers() {
  try {
    const {
      data: { users },
    } = await axios.get("/api/admin/users");
    return users;
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function updateUserStatus(id) {
  try {
    await axios.put(`/api/admin/blockUser/${id}`);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function getAllTurfAdmin() {
  try {
    const {
      data: { turfAdmin },
    } = await axios.get("/api/admin/turfAdmin");
    return turfAdmin;
  } catch (error) {
    return Promise.reject({ error });
  }
}
export async function updateAdminStatus(id) {
  try {
    await axios.put(`/api/admin/blockTurfAdmin/${id}`);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function adminLogin(credentials) {
  try {
    const {
      data: { token },
    } = await axios.post("/api/admin/login", credentials);
    return token;
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function getReq() {
  try {
    const {
      data: { turfs },
    } = await axios.get("/api/admin/getTurfRequest");
    console.log(turfs)
    return turfs;
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function acceptReq(id){
  try {
    await axios.put('/api/admin/acceptReq',{id})
  } catch (error) {
    return Promise.reject({ error });
    
  }
}

export async function rejectReq(id){
  try {
    await axios.put('/api/admin/rejectReq',{id})
  } catch (error) {
    return Promise.reject({ error });
    
  }
}   

export async function getAllOrder (){
  try {
    const {data:{order}} = await axios.get('/api/admin/getAllOrder')
    return order;
  } catch (error) {
    
  }
}

export async function totalSale (){
  try {
    const {data:{totalsales}} = await axios.get('/api/admin/totalSale')
  } catch (error) {
    
  }
}
