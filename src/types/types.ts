import {NextFunction, Request, Response} from "express";

export interface NewUserRequestBody {
	_id: any;
	name: string;
	email: string;
	image: string;
	dob: Date;
	gender: "male" | "female" | "other";
}

// * NewProduct RequestBody
export interface NewProductRequestBody {
	name: string;
	category: string;
	image?: string;
	price: number;
	stock: number;
}

// * Search Query params for products
export interface SearchQueryParams {
	search?: string;
	price?: number;
	page?: number;
	category?: string;
	sort?: string;
}

// * Base Query Products Interface
export interface BaseQuery {
	name?: {
		$regex: string | RegExp;
	};
	price?: {
		$lte: number;
	};
	category?: string;
}

// * Controller Types

export type ControllerType = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void | Response<any, Record<string, any>>>;

// * Product update request body

export interface ProductUpdateRequestBody {
	name?: string;
	category?: string;
	price?: number;
	stock?: number;
	image?: string;
}
