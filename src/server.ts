import app from "./app";
import { AppDataSource } from "./database";

AppDataSource.initialize()
	.then(async () => {
		console.log("Connected to database.");
		app.listen(3333, () => {
			console.log("Server running on Port 3333.");
		});
	})
	.catch((error) => {
		console.log(error);
	});
