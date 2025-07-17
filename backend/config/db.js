import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://FoodDelivery:FoodDelivery@cluster0.mpqtity.mongodb.net/FoodDelivery"
    )
    .then(() => console.log("MongoDB connected successfully"));
};
