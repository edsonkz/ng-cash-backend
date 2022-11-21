import { AccountRepository } from "../repositories/AccountRepository";
import { Account } from "../models/Account";

export default class AccountServices {
	async findOne(id: string): Promise<Account> {
		const account = await AccountRepository.findOneBy({ id });
		return account;
	}

	async create(account: Account): Promise<Account> {
		const newAccount = await AccountRepository.save(account);
		return newAccount;
	}
}
