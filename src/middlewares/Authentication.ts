import { NextFunction, Request, Response } from "express";
import jwtService from "jsonwebtoken";

declare global {
	namespace Express {
		export interface Request {
			userInfo?: { id: number; iat: number; exp: number };
		}
	}
}

const jwtAuthentication = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader;
	if (token === null || token.length === 0) {
		return res
			.status(403)
			.send({ error: "Forbbiden access to unauthorized users." });
	}
	// Efetuando a validação do JWT:
	jwtService.verify(
		token,
		process.env.TOKEN_SECRET as string,
		(err: Error, userInfo: any) => {
			if (err) {
				res.status(403).send(err);
				return;
			}

			// O objeto "req" é alterado abaixo
			// recebendo uma nova propriedade userInfo.
			// Este mesmo objeto chegará na rota
			// podendo acessar o req.userInfo
			req.userInfo = userInfo;
			next();
		}
	);
};

export default jwtAuthentication;
