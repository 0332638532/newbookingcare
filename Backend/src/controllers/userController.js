import userService from "../services/userService";
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(404).json({
            errCode: 1,
            message: "Vui long nhap gia tri",
        });
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
};

module.exports = {
    handleLogin: handleLogin,
};
