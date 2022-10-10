import express from "express";
import homePage from "../controllers/homeController";

let router = express.Router();

let initwebRoutes = (app) => {
    router.get("/", homePage.homePage);
    return app.use("/", router);
};

module.exports = initwebRoutes;
