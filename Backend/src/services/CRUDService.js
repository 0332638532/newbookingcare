import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassBcrypt = await hashUserPassword(data.password);
            // console.log(data);
            // console.log(hashPassBcrypt);
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
            resolve("Oke create success");
        } catch (e) {
            reject(e);
        }
    });
};

//get all user
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

//get user id
let getUserId = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userid },
                raw: true,
            });
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    });
};

//update user
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;

                await user.save();
                let allusers = await db.User.findAll();
                resolve(allusers);
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e);
        }
    });
};

//delete user
let deleteUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
            });
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

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
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserId: getUserId,
    updateUser: updateUser,
    deleteUserId: deleteUserId,
};
