import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import connectDB from "./config/connectDB";
import initwebRoutes from "./route/web";

require("dotenv").config();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initwebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("server is running on the port:", +port);
});
