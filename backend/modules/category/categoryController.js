import cloudinary from "../../utils/cloudinary.js";
import categoryModel from "./categoryModel.js";
import multer from "../../middleware/upload.js"

export const createCategory = async (req, res) => {
    try {
        const { name, description, slug,  status } = req.body;


        const createdCategory = await categoryModel.create({
            name,
            description,
            slug,
            status
        });

        res.json({
            message: "Category created successfully",
            createdCategory,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const fetchCategory = async (req, res) => {
    try {
        const fetchedCategory = await categoryModel.find();
        res.json({
            message: "Category fetched successfully",
            fetchedCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }

}
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await categoryModel.findByIdAndDelete(id)
        res.json({
            message: "Category deleted successfully",
            deletedCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }


}

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name,
        description,
        slug,
        status,
    } = req.body

    try {
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {
            name,
            description,
            slug,
            status,

        }, { new: true })
        res.json({
            message: "Category updated successfully",
            updatedCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}


export const getSingleCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await categoryModel.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: category,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};