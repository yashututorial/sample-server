import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    },
    password: {
    type: String,
    required: true,
    },
    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    }
},{ timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return ;
  }
  try {    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // next();
    return;
  } catch (err) {
    return err;
  }});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;