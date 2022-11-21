import { AppDataSource } from "../database";
import { Transaction } from "../models/Transaction";

export const TransactionRepository = AppDataSource.getRepository(Transaction);