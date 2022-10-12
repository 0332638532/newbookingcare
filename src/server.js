import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initwebRoutes from "./route/web";
import connectDB from "./config/connectDB";

require("dotenv").config();
let app = express();

viewEngine(app);
initwebRoutes(app);
connectDB();

app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("server is running on the port:", +port);
});
