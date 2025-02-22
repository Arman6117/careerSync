import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    miniLength: 8,
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  preferences: {
    roles: { type: [String], default: [] },
    locations: { type: [String], default: [] },
    employmentType: { type: [String], default: [] },
    experienceLevel: { type: String, default: "" },
    salaryRange: { type: String, default: "" },
    skills: { type: [String], default: [] },
    industries: { type: [String], default: [] },
    jobAlertFrequency: {
      type: String,
      enum: ["Daily", "Weekly", "None"],
      default: "Weekly",
    },
  },
  savedJobs: {
    type: Object,
    default: {},
  },
  likedJobs: {
    type: Object,
    default: {},
  },

  refreshTokens: [
    {
      token: String,
      expiresAt: Date,
    },
  ],
  resetPasswordToken: [
    {
      token: String,
      expiresAt: Date,
    },
  ],
  emailVerificationToken: [
    {
      token: String,
      expiresAt: Date,
    },
  ],
});

UserSchema.pre("save", async function (next) {
  const user = this;

  //!Don't do anything if password is not changed
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);

  //!Hash the original password
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
