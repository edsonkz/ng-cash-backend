import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity("accounts")
class Account {
	@PrimaryGeneratedColumn()
	readonly id: string;

	@Column()
	balance: number;

	@OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
	debitedTransactions: Transaction[];

	@OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
	creditedTransactions: Transaction[];
}

export { Account };
