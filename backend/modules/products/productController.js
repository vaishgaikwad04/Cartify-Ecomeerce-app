import cloudinary from "../../utils/cloudinary.js";
import productModel from "./productModel.js";
import multer from "../../middleware/upload.js";

export const createProduct = async (req, res) => {
  try {
    let variantsData = req.body.variants;
    if (typeof variantsData === "string") {
      variantsData = JSON.parse(variantsData);
    }

    let isOnSaleData = req.body.isOnSale;
    if (typeof isOnSaleData === "string") {
      isOnSaleData = JSON.parse(isOnSaleData);
    }

    const {
      name,
      description,
      price,
      category,
      brand,
      quantity,
      details,
      careFit,
      discountPrice,
    } = req.body;

    const imageUrls = [];

    // ✅ UPLOAD TO CLOUDINARY file -> req.files
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });

      console.log(req.files)

      imageUrls.push(result.secure_url);
    }

    const createdProduct = await productModel.create({
      name,
      description,
      details,
      careFit,
      price,
      category: category.toLowerCase(),
       brand,
      quantity,
      images: imageUrls,
      discountPrice,
      variants: variantsData,
      isOnSale: isOnSaleData,
    });
    res.status(201).json({
      message: "Product created successfully",
      createdProduct,
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const fetchProduct = async (req, res) => {
  try {
    const fetchedProduct = await productModel.find();

    res.status(200).json({
      message: "Products fetched successfully",
      fetchedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const fetchProductBasedOnCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // fetch products based on category
    const categoryData = await productModel.find({
      category: category.toLowerCase(),
    });

    // if no products found
    if (!categoryData || categoryData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for this category",
        data: [],
      });
    }

    // success response
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: categoryData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ same parsing logic as createProduct
    let variantsData = req.body.variants;
    if (typeof variantsData === "string") {
      variantsData = JSON.parse(variantsData);
    }

    let isOnSaleData = req.body.isOnSale;
    if (typeof isOnSaleData === "string") {
      isOnSaleData = JSON.parse(isOnSaleData);
    }

    const {
      name,
      description,
      price,
      category,
       brand,
      quantity,
      details,
      careFit,
      discountPrice,
    } = req.body;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imageUrls = [];

    // ✅ same CLOUDINARY upload logic as createProduct
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });

        console.log(req.files      )

        imageUrls.push(result.secure_url);
      }
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
  id,
  {
    name,
    description,
    price,
     brand,
    category: category
      ? category.toLowerCase()
      : product.category.toLowerCase(),
    quantity,
    details,
    careFit,
    discountPrice,
    variants: variantsData,
    isOnSale: isOnSaleData,
    ...(imageUrls.length > 0 && { images: imageUrls }),
  },
  { new: true }
);

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const fetchedProduct = await productModel.find();

    // total products
    const totalProduct = fetchedProduct.length;

    // total on sale products
    const productIsOnSale = fetchedProduct.filter(
      (item) => item.isOnSale,
    ).length;

    // 3. Total Stock
    const totalStock = fetchedProduct.reduce((acc, item) => {
      const productStock = item.variants?.reduce(
        (sum, v) => sum + Number(v.stock || 0),
        0,
      );
      return acc + productStock;
    }, 0);

    res.status(200).json({
      message: "Dashboard stats fetched successfully",
      totalProduct,
      productIsOnSale,
      totalStock,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const handleToggle = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isOnSale = !product.isOnSale;

    await product.save();

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const products = await productModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductsByBrand = async (req, res) => {
  try {
    const { brand } = req.query;

    const products = await productModel.find({
       brand: brand,
    });

    

    res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};