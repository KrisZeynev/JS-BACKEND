import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";

// TODO: Modify user schema based on the exam
const deviceSchema = new Schema({
  brand: {
    type: String,
    reqired: true,
  },
  hardDisk: {
    type: String,
    reqired: true,
  },
  screenSize: {
    type: String,
    reqired: true,
  },
  ram: {
    type: String,
    reqired: true,
  },
  operatingSystem: {
    type: String,
    reqired: true,
  },
  cpu: {
    type: String,
    reqired: true,
  },
  gpu: {
    type: String,
    reqired: true,
  },
  price: {
    type: Number,
    reqired: true,
  },
  color: {
    type: String,
    reqired: true,
  },
  weight: {
    type: String,
    reqired: true,
  },
  image: {
    type: String,
    reqired: true,
  },
  prefferedList: [{
    type: Types.ObjectId,
    required: true
  }],
  owner: {
    type: Types.ObjectId,
    required: true
  }

});

const Device = model("Device", deviceSchema);

export default Device;
