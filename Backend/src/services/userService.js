import bcrypt from "bcryptjs";
import db from "../models/index";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ["email", "roleId", "password"],
                    raw: true,
                });
                if (user) {
                    let check = bcrypt.compareSync(password, user.password); // false
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "Success";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Password wrong";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User not found";
                }
            } else {
                userData.errCode = 1;
                userData.errMessage =
                    "Tai khoan khong ton tai, vui long nhap lai";
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail,
                },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
};
