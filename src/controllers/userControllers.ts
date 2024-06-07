import {Request, Response, NextFunction} from "express";
import UserModal from "../models/userModal.js";
import {NewUserRequestBody} from "../types/types.js";
import {TryCatch} from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";

// * handleNewUser -> /api/v1/user/new
export const handleNewUser = TryCatch(async (req: Request<{}, {}, NewUserRequestBody>, res: Response, next: NextFunction) => {
	const {name, email, gender, image, dob, _id} = req.body;

	let user = await UserModal.findById(_id);

	if (user) {
		return res.status(200).json({
			success: true,
			message: `Welcome back ${name}!`,
			payload: user,
		});
	}

	user = await UserModal.create({
		_id,
		name,
		gender,
		email,
		image,
		dob,
	});
	return res.status(201).json({
		success: true,
		message: `Welcome ${user.name}! Your account has been created successfully!`,
	});
});

export const handleGetAllUsers = TryCatch(async (req, res, next) => {
	const users = await UserModal.find({});
	return res.status(200).json({
		success: true,
		payload: users,
	});
});

export const handleGetUser = TryCatch(async (req, res, next) => {
	const {id} = req.params;

	const user = await UserModal.findById({_id: id});
	console.log(user);
	if (!user) return next(new ErrorHandler("Invalid user id", 400));
	return res.status(200).json({
		success: true,
		payload: user,
	});
});
