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
    console.log("----------------");
    console.log(data);
    console.log("----------------");
    return res.render("getCRUD.ejs", {
        datatable: data,
    });
};

module.exports = {
    homePage: homePage,
    getCRUD: getCRUD,
    postDATA: postDATA,
    getDATA: getDATA,
};
