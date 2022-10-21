import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post("/api/login", { email, password });
};

const getAllUser = (inputid) => {
    return axios.get(`/api/get-all-users?id=${inputid}`);
};

export { handleLoginApi, getAllUser };
