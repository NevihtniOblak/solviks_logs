import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    password: string;
    role: "admin" | "user";
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<User> = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user" },
    },
    { timestamps: true }
);

UserSchema.pre<User>("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User: Model<User> = mongoose.model<User>("User", UserSchema);
