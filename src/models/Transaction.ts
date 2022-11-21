import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
} from "typeorm";
import { Account } from "./Account";

@Entity("transactions")
class Transaction {
	@PrimaryGeneratedColumn()
	readonly id: string;

	@ManyToOne(() => Account, (account) => account.debitedTransactions, {
		cascade: true,
	})
	@JoinColumn()
	debitedAccount: Account;

	@ManyToOne(() => Account, (account) => account.creditedTransactions, {
		cascade: true,
	})
	@JoinColumn()
	creditedAccount: Account;

	@Column()
	value: number;

	@CreateDateColumn()
	created_at: Date;
}

export { Transaction };
