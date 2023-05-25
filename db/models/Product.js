import mongoose from "mongoose";
import "./Review";

const { Schema } = mongoose;

const productSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  phone: { type: String },
  mail: { type: String },
  /*  reviews: { type: [Schema.Types.ObjectId], ref: "Review" }, */
});

/* const lastNameSchema = new Schema({
  lastName: { type: String, required: true },
}); */

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

/* const LastName =
  mongoose.models.LastName || mongoose.model("LastName", lastNameSchema); */

export default Product;
