import db from "../models/index";
import CRUDService from "../services/CRUDService.js";

let homePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    } catch (error) {
        console.log(error);
    }
};

let getCRUD = (req, res) => {
    res.render("crud.ejs");
};

let postDATA = async (req, res) => {
    CRUDService.createNewUser(req.body);
    // console.log(message);
    return res.send("Pham Van Khanh");
};

let getDATA = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render("getCRUD.ejs", {
        datatable: data,
    });
};

let editDATA = async (req, res) => {
    let userid = req.query.id;
    if (userid) {
        let userData = await CRUDService.getUserId(userid);

        return res.render("editCRUD.ejs", {
            user: userData,
        });
    } else {
        return res.send("user not found");
    }
};

let putDATA = async (req, res) => {
    let data = req.body;
    let allusers = await CRUDService.updateUser(data);
    return res.render("getCRUD.ejs", {
        datatable: allusers,
    });
};

let deleteDATA = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserId(id);
        return res.send("delete user success");
    } else {
        return res.send("not found");
    }
};
module.exports = {
    homePage: homePage,
    getCRUD: getCRUD,
    postDATA: postDATA,
    getDATA: getDATA,
    editDATA: editDATA,
    putDATA: putDATA,
    deleteDATA: deleteDATA,
};
