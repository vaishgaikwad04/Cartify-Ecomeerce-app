import productModel from "../products/productModel.js";

export const getSearchItem = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const search = q.trim();

    const products = await productModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to search",
    });
  }
};

export const getHello = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Search route working",
  });
};