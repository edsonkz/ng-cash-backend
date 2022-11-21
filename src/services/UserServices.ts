import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";

export default class UserService {
	async findOne(id: number) {
		const user = await UserRepository.find({
			relations: { account: true },
			where: { id: id },
		});
		return user;
	}

	async findOneByUsername(username: string) {
		const user = await UserRepository.find({
			relations: { account: true },
			where: { username },
		});
		return user;
	}

	async create(user: User): Promise<User> {
		const newUser = await UserRepository.save(user);
		return newUser;
	}
}
