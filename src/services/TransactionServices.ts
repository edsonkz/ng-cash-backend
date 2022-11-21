import { TransactionRepository } from "../repositories/TransactionRepository";
import { Transaction } from "../models/Transaction";

export default class TransactionServices {
	async findOne(id: string): Promise<Transaction> {
		const transaction = await TransactionRepository.findOneBy({ id });
		return transaction;
	}

	async findAll(id: number, type: string) {
		const builder =
			TransactionRepository.createQueryBuilder("transactions");

		if (type === "all") {
			builder.where(
				"transactions.creditedAccountId = :id OR transactions.debitedAccountId = :id",
				{ id }
			);
		} else if (type === "cashIn") {
			builder.where("transactions.creditedAccountId = :id", { id });
		} else if (type === "cashOut") {
			builder.where("transactions.debitedAccountId = :id", { id });
		}
		const transactions = await builder.getMany();
		return transactions;
	}

	async findAllwithUser(id: number) {
		const builder =
			TransactionRepository.createQueryBuilder("transactions");
		builder
			.select("transactions.id")
			.addSelect("u.username")
			.addSelect("transactions.creditedAccountId")
			.addSelect("transactions.debitedAccountId")
			.addSelect("transactions.created_at")
			.addSelect("transactions.value")
			.innerJoin(
				"users",
				"u",
				"transactions.creditedAccountId = u.accountId or transactions.debitedAccountId = u.accountId"
			)
			.distinct(true)
			.where(
				"transactions.creditedAccountId = :id OR transactions.debitedAccountId = :id",
				{ id }
			);
		const transactions = await builder.getRawMany();
		return transactions;
	}

	async create(transaction: Transaction): Promise<Transaction> {
		const newTransaction = await TransactionRepository.save(transaction);
		return newTransaction;
	}
}
