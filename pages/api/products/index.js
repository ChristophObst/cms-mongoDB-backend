import Product from "../../../db/models/Product";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const products = await Product.find();
    return response.status(200).json(products);
  }

  if (request.method === "DELETE") {
    const productToDelete = await Product.findByIdAndDelete(id);
    // Declare jokeToDelete to be the joke identified by its id and delete it.
    // This line handles the entire deletion process.
    response.status(200).json(productToDelete);
  }

  if (request.method === "POST") {
    try {
      const productData = request.body;
      const product = new Product(productData);
      await product.save();
      response.status(201).json({ status: "Product created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
