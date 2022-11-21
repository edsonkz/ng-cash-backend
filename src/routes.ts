import { Router } from "express";
import UserController from "./controllers/UserController";
import AccountController from "./controllers/AccountController";
import TransactionController from "./controllers/TransactionController";
import jwtAuthentication from "./middlewares/Authentication";

const routes: Router = Router();

routes.get("/api/users/:id", UserController.findOne);
routes.post("/api/users/", UserController.create);
routes.post("/api/login/", UserController.login);

routes.get("/api/balance", jwtAuthentication, AccountController.balance);

//routes.get("/transactions", jwtAuthentication, TransactionController.findAll);
routes.get(
	"/api/transactions",
	jwtAuthentication,
	TransactionController.findAllwithUser
);
routes.post(
	"/api/transactions/",
	jwtAuthentication,
	TransactionController.createCashOutTransaction
);

export default routes;
