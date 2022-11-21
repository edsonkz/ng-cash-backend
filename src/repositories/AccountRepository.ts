import { AppDataSource } from "../database";
import { Account } from "../models/Account";

export const AccountRepository = AppDataSource.getRepository(Account);
