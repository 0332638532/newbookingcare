import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post("/api/login", { email, password });
};

const getAllUser = (inputid) => {
    return axios.get(`/api/get-all-users?id=${inputid}`);
};

const createNewUserService = (data) => {
    console.log(data);
    return axios.post(`/api/create-new-user`, data);
};

const deleteUserService = (userId) => {
    return axios.delete("/api/delete-user", {
        data: {
            id: userId,
        },
    });
};

export { handleLoginApi, getAllUser, createNewUserService, deleteUserService };
