import {NextFunction, Request, Response} from "express";
import logger from "../utils/logger.js";
import ErrorHandler from "../utils/utility-class.js";
import {ControllerType} from "../types/types.js";

// ! Error Middleware Function
export const errorMiddleWare = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
	logger.error(err.message);
	err.message = err.message || "Internal Server Error";
	err.statusCode = err.statusCode || 500;
	return res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};

// ! Not Found Middleware Function
export const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new ErrorHandler(`Not Found - ${req.originalUrl}`, 404);
	next(error);
};

// ! Try Catch Async Function

// export const TryCatch = (func: ControllerType) => {
// 	return (req: Request, res: Response, next: NextFunction) => {
// 		return Promise.resolve(func(req, res, next)).catch((err) => {
// 			next(err);
// 		});
// 	};
// };

// ! Try Catch Async Function
export const TryCatch = (controller: ControllerType) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Call the controller function and await its result
			await controller(req, res, next);
		} catch (error) {
			// Pass any errors to the next middleware
			next(error);
		}
	};
};