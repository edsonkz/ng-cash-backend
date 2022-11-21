import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { MinLength, Matches } from "class-validator";
import { Account } from "./Account";

@Entity("users")
class User {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column({ unique: true })
	@MinLength(3, {
		message: "username is too short. Minimum of 3 characters.",
	})
	username: string;

	@Column()
	@MinLength(8, {
		message: "password is too short. Minimum of 8 characters.",
	})
	@Matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/, {
		message:
			"password must contain at least 8 characters, one number and one uppercase letter.",
	})
	password: string;

	@OneToOne(() => Account, { cascade: true })
	@JoinColumn()
	account: Account;
}

export { User };
