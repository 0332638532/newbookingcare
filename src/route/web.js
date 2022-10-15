import express from "express";
import homeController from "../controllers/homeController.js";

let router = express.Router();

let initwebRoutes = (app) => {
    router.get("/", homeController.homePage);
    router.get("/crud", homeController.getCRUD);

    router.post("/post-crud", homeController.postDATA);

    return app.use("/", router);
};

module.exports = initwebRoutes;
