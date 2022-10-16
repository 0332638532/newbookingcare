import express from "express";
import homeController from "../controllers/homeController.js";

let router = express.Router();

let initwebRoutes = (app) => {
    router.get("/", homeController.homePage);
    router.get("/crud", homeController.getCRUD);

    router.post("/post-crud", homeController.postDATA);
    router.get("/get-crud", homeController.getDATA);
    router.get("/edit-crud", homeController.editDATA);
    router.post("/put-crud", homeController.putDATA);

    return app.use("/", router);
};

module.exports = initwebRoutes;
