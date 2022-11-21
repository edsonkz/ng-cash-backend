import { Request, Response } from "express";
import { validate } from "class-validator";
import UserServices from "../services/UserServices";
import { User } from "../models/User";
import { Account } from "../models/Account";
import * as bcrypt from "bcrypt";
import jwtService from "jsonwebtoken";

export default {
	async findOne(req: Request, res: Response) {
		let { id } = req.params;
		const userServices = new UserServices();

		try {
			const user = await userServices.findOne(parseInt(id));
			if (user.length < 1) {
				return res
					.status(404)
					.send({ error: "User not found with that id." });
			}

			return res.send(user);
		} catch (error) {
			return res.status(400).send(error);
		}
	},

	async create(req: Request, res: Response) {
		let { username, password } = req.body;
		const userServices = new UserServices();
		if (!username || !password) {
			return res
				.status(400)
				.send({ error: "username/password are required." });
		}
		const newUser = new User();
		const newAccount = new Account();

		newUser.username = username;
		newUser.password = password;

		newAccount.balance = 100;
		newUser.account = newAccount;

		validate(newUser).then(async (errors) => {
			if (errors.length > 0) {
				console.log("validation failed. errors: ", errors);
				return res
					.status(400)
					.send({ error: "validation failed.", errors });
			} else {
				try {
					const salt = await bcrypt.genSalt(10);
					newUser.password = await bcrypt.hash(password, salt);
					const user = await userServices.create(newUser);
					return res.status(201).send(user);
				} catch (error) {
					return res
						.status(400)
						.send({ erroCode: error.driverError.code });
				}
			}
		});
	},

	async login(req: Request, res: Response) {
		console.log(req.body);
		let { username, password } = req.body;
		const userServices = new UserServices();
		if (!username || !password) {
			return res
				.status(400)
				.send({ error: "username/password are required." });
		}
		try {
			const user = await userServices.findOneByUsername(username);
			console.log(user);
			if (user.length > 0) {
				// check user password with hashed password stored in the database
				const validPassword = await bcrypt.compare(
					password,
					user[0].password
				);
				if (validPassword) {
					const token = jwtService.sign(
						{ id: user[0].id },
						process.env.TOKEN_SECRET,
						{ expiresIn: 86400 }
					);
					return res.status(200).json({
						message: "Valid password. You are logged in.",
						jwt: token,
						user: user[0],
					});
				} else {
					return res.status(400).json({ error: "Invalid Password" });
				}
			} else {
				return res.status(401).json({ error: "User does not exist" });
			}
		} catch (err) {
			console.log(err);
		}
	},
};
