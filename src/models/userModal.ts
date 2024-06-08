import mongoose, {Schema, Document} from "mongoose";

interface IUser extends Document {
	_id: string;
	name: string;
	email: string;
	image: string;
	role: "admin" | "user";
	dob: Date;
	gender: "male" | "female" | "other";
	createdAt: Date;
	updatedAt: Date;
	// * virtual attribute
	age: number;
}

const userSchema = new Schema(
	{
		_id: {
			type: String,
			required: [true, "Please provide an id"],
		},
		name: {
			type: String,
			minLength: [3, "Name must be at least 3 characters"],
			maxLength: [50, "Name must be at most 50 characters"],
			required: [true, "Please provide your name"],
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: [true, "Please provide an email"],
			trim: true,
			lowercase: true,
			validate: {
				validator: (value: string) => {
					return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value);
				},
				message: (props: any) => `${props.value} is not a valid email address!`,
			},
		},
		image: {
			type: String,
			required: [true, "Please provide an image"],
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
		dob: {
			type: Date,
			required: [true, "Please provide a date of birth"],
		},
		gender: {
			type: String,
			enum: ["male", "female", "other"],
			required: [true, "Please Enter your gender"],
		},
	},
	{
		timestamps: true,
	},
);

userSchema.virtual("age").get(function () {
	const today: Date = new Date();
	const birthDate: Date = new Date(this.dob);
	let age: number = today.getFullYear() - birthDate.getFullYear();
	const month: number = today.getMonth() - birthDate.getMonth();
	if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
