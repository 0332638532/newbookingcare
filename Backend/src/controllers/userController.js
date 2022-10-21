import userService from "../services/userService";
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(404).json({
            errCode: 1,
            message: "Please enter your account and password",
        });
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
};

let handleGetAllUser = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter",
            users: [],
        });
    }
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "Success",
        users,
    });
};
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
};
