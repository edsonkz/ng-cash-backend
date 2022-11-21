import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: 5432,
	username: process.env.DB_USER,
	password: process.env.DB_ROOT_PASSWORD,
	database: process.env.DB_DATABASE,
	migrations: ["src/database/migrations/**.ts"],
	entities: ["src/models/**.ts"],
	synchronize: true,
	//logging: true,
});
