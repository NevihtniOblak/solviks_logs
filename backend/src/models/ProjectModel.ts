import mongoose, { Schema, Document, Model } from "mongoose";
import crypto from "crypto";

export interface Project extends Document {
    name: string;
    apiKey: string;
    createdBy: mongoose.Types.ObjectId;
    compareApiKey(candidateKey: string): Promise<boolean>;
}

const ProjectSchema: Schema<Project> = new Schema(
    {
        name: { type: String, required: true, trim: true },
        apiKey: { type: String, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

ProjectSchema.pre<Project>("save", function (next) {
    if (!this.isModified("apiKey")) return next();

    this.apiKey = crypto.createHash("sha256").update(this.apiKey).digest("hex");
    next();
});

ProjectSchema.methods.compareApiKey = function (candidateKey: string) {
    const candidateHash = crypto.createHash("sha256").update(candidateKey).digest("hex");
    return candidateHash === this.apiKey;
};

export const Project: Model<Project> = mongoose.model<Project>("Project", ProjectSchema);
