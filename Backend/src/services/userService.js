import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    });
};

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
                        userData.errMessage = "Login success";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage =
                            "Password is incorrect, please re-enter";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "Invalid account, please re-enter";
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Account does not exist ";
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

let getAllUser = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userid === "All") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"],
                    },
                });
            } else {
                users = await db.User.findOne({
                    where: { id: userid },
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "Email already exists, please choose another email",
                });
            } else {
                let hashPassBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPassBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === "1" ? true : false,
                    roleId: data.roleId,
                });
                resolve({
                    errCode: 0,
                    message: "OK",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "Please enter the value",
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;

                await user.save();
                resolve({
                    errCode: 0,
                    message: "Update user success",
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "user not found",
                });
            }
        } catch (e) {
            console.log(e);
        }
    });
};

let deleteUser = (userid) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userid },
        });

        if (!user) {
            resolve({
                errCode: 2,
                message: "Account does not exist",
            });
        }

        await db.User.destroy({
            where: { id: userid },
        });

        resolve({
            errCode: 0,
            message: "Delete user success",
        });
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
};
