import { Request, Response } from "express";
import AccountServices from "../services/AccountServices";
import UserServices from "../services/UserServices";
import { Account } from "../models/Account";

export default {
	async findOne(req: Request, res: Response) {
		let { id } = req.params;
		console.log(typeof id);
		const accountService = new AccountServices();
		try {
			const account = await accountService.findOne(id);

			if (!account) {
				return res
					.status(404)
					.send({ error: "Account not found with that id." });
			}

			return res.send(account);
		} catch (error) {
			return res.status(400).send(error);
		}
	},

	async create(req: Request, res: Response) {
		const accountService = new AccountServices();

		try {
			const newAccount = new Account();
			newAccount.balance = 100.0;
			const account = await accountService.create(newAccount);
			return res.status(201).send(account);
		} catch (error) {
			return res.status(400).send(error);
		}
	},

	async balance(req: Request, res: Response) {
		const { userInfo } = req;
		const userServices = new UserServices();
		try {
			const user = await userServices.findOne(userInfo.id);
			return res.status(200).send(user[0].account);
		} catch (error) {
			return res.status(400).send(error);
		}
	},
};
