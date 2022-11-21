import { Request, Response } from "express";
import TransactionServices from "../services/TransactionServices";
import UserServices from "../services/UserServices";
import { Transaction } from "../models/Transaction";

export default {
	async findAll(req: Request, res: Response) {
		const { userInfo } = req;
		let type;
		const userServices = new UserServices();
		const transactionServices = new TransactionServices();

		if (req.query.type === undefined) {
			type = "all";
		} else {
			type = req.query.type.toString();
		}

		try {
			const user = await userServices.findOne(userInfo.id);
			const transactions = await transactionServices.findAll(
				parseInt(user[0].account.id),
				type.toString()
			);
			res.status(200).send(transactions);
		} catch (error) {
			return res.status(400).send(error);
		}
	},

	async findAllwithUser(req: Request, res: Response) {
		const { userInfo } = req;
		const userServices = new UserServices();
		const transactionServices = new TransactionServices();

		try {
			const user = await userServices.findOne(userInfo.id);
			const transactions = await transactionServices.findAllwithUser(
				parseInt(user[0].account.id)
			);

			let filteredTransactions = transactions.filter(
				(transaction) => transaction.u_username !== user[0].username
			);
			let newTransactions = filteredTransactions.map((transaction) => {
				let temp = Object.assign({}, transaction);
				if (userInfo.id === transaction.creditedAccountId) {
					temp["type"] = "cashIn";
				} else {
					temp["type"] = "cashOut";
				}
				console.log(temp.type);
				return temp;
			});

			newTransactions = newTransactions.map(
				({ creditedAccountId, debitedAccountId, ...keepAttrs }) =>
					keepAttrs
			);

			res.status(200).send(newTransactions);
		} catch (error) {
			return res.status(400).send(error);
		}
	},

	async createCashOutTransaction(req: Request, res: Response) {
		const { userInfo } = req;
		const { username } = req.body;
		const balance = parseInt(req.body.balance);
		const userServices = new UserServices();
		const transactionServices = new TransactionServices();

		try {
			const userCashOut = await userServices.findOne(userInfo.id);
			const userCashIn = await userServices.findOneByUsername(username);

			if (userInfo.id === userCashIn[0].id) {
				return res.status(403).send({
					error: "A user cannot do transactions with himself.",
				});
			}
			if (userCashIn.length < 1) {
				return res.status(403).send({
					errCode: 0,
					error: "User not found with that id.",
				});
			}

			const accountCashOut = userCashOut[0].account;
			const accountCashIn = userCashIn[0].account;

			if (accountCashOut.balance - balance < 0) {
				return res.status(403).send({
					errCode: 1,
					error: "User does not have enough balance for this operation.",
				});
			}

			accountCashOut.balance = accountCashOut.balance - balance;
			accountCashIn.balance = accountCashIn.balance + balance;

			const newTransaction = new Transaction();
			newTransaction.debitedAccount = accountCashOut;
			newTransaction.creditedAccount = accountCashIn;
			newTransaction.value = balance;
			newTransaction.created_at = new Date();

			const savedTransaction = await transactionServices.create(
				newTransaction
			);

			res.status(200).send({
				savedTransaction: {
					transactions_created_at: savedTransaction.created_at,
					transactions_id: savedTransaction.id,
					transactions_value: savedTransaction.value,
					u_username: userCashIn[0].username,
					type: "cashOut",
				},
			});
		} catch (error) {
			return res.status(400).send(error);
		}
	},
};
