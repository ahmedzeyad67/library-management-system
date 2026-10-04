import { Schema, model } from "mongoose";
import validator from "validator";
import { hash } from "bcrypt";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 25,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 25,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email",
      },
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      maxlength: 20,
      validate: {
        validator: (value) => validator.isMobilePhone(value, "any"),
        message: "Please enter a valid phone number",
      },
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await hash(this.password, 12);
});

export default model("User", userSchema);
