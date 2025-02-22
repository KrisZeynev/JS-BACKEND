import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

// TODO: Modify user schema based on the exam
const userSchema = new Schema({
  email: {
    type: String,
    reqired: [true, 'Email is required!'],
  },
  username: {
    type: String,
    reqired: [true, 'Username is required!'],
  },
  password: {
    type: String,
    reqired: [true, 'Password is required!'],
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", userSchema);

export default User;