import express from "express";
import "reflect-metadata";
import cors from "cors";
import routes from "./routes";
import { AppDataSource } from "./database";
import path from "path";

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(routes);

const indexPath = path.join(__dirname, "../build/index.html");

app.get("*", (req, res) => {
	console.log("sending index.html");
	res.sendFile(indexPath);
});

export default app;
