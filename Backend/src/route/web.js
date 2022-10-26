import express from "express";
import homeController from "../controllers/homeController.js";
import userController from "../controllers/userController";

let router = express.Router();

let initwebRoutes = (app) => {
    router.get("/", homeController.homePage);
    router.get("/crud", homeController.getCRUD);

    router.post("/post-crud", homeController.postDATA);
    router.get("/get-crud", homeController.getDATA);

    router.get("/edit-crud", homeController.editDATA);
    router.post("/put-crud", homeController.putDATA);

    router.get("/delete-crud", homeController.deleteDATA);

    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUser);
    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUser);

    return app.use("/", router);
};

module.exports = initwebRoutes;
