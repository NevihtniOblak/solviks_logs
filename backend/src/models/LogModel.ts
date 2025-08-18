import mongoose, { Schema, Document, Model } from "mongoose";

export interface Log extends Document {
    _id: mongoose.Types.ObjectId;
    severity: number;
    source: string;
    timestamp: Date;
    project: mongoose.Types.ObjectId;
    data?: Record<string, any>;
}

const LogSchema: Schema<Log> = new Schema(
    {
        severity: {
            type: Number,
            required: true,
        },
        source: { type: String, required: true },
        timestamp: { type: Date, required: true },
        project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
        data: { type: Schema.Types.Mixed },
    },
    { strict: false, timestamps: true }
);

export const Log: Model<Log> = mongoose.model<Log>("Log", LogSchema);
