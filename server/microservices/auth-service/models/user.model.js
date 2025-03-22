import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRound = 10;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
    },
    role: {
      type: String,
      required: true,
      enum: ["Resident", "BusinessOwner", "CommunityOrganizer"],
      default: "Resident",
    },
    password: { type: String, required: true, minlength: 2 },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, saltRound);
  }
  next();
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  userObject.id = userObject._id;
  return userObject;
};

const User = mongoose.model("User", UserSchema);

export default User;
