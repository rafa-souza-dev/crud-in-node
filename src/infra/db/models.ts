import mongoose, { Schema, Document } from 'mongoose';

export interface ClientDocument extends Document<string> {
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

const ClientSchema = new Schema<ClientDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
}, {
    timestamps: true
});

export const ClientModel = mongoose.model<ClientDocument>('Client', ClientSchema);
