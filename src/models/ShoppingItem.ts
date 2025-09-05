import mongoose, { Schema, Document } from "mongoose";

export interface IShoppingItem extends Document {
  name: string;
  quantity: number;
  bought: boolean;
}

const ShoppingItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  bought: { type: Boolean, default: false },
});

export default mongoose.model<IShoppingItem>("ShoppingItem", ShoppingItemSchema);
