import addressModel from "./addressModel.js";

// ==========================================
// CREATE ADDRESS
// ==========================================

export const createAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      fullName,
      phone,
      addressLine,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !phone ||
      !addressLine ||
      !city ||
      !state ||
      !postalCode ||
      !country
    ) {
      return res.status(400).json({
        success: false,
        message: "All address fields are required",
      });
    }

    // If this address is default,
    // remove default from previous addresses
    if (isDefault) {
      await addressModel.updateMany(
        { userId },
        { $set: { isDefault: false } }
      );
    }

    const address = await addressModel.create({
      userId,
      fullName,
      phone,
      addressLine,
      city,
      state,
      postalCode,
      country,
      isDefault: isDefault || false,
    });

    res.status(201).json({
      success: true,
      message: "Address created successfully",
      address,
    });
  } catch (error) {
    console.error("Create address error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create address",
      error: error.message,
    });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const addresses = await addressModel.find({ userId })
      .sort({ isDefault: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error("Get addresses error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch addresses",
      error: error.message,
    });
  }
};

export const getAddressById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const address = await addressModel.findOne({
      _id: id,
      userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    console.error("Get address error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch address",
      error: error.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const {
      fullName,
      phone,
      addressLine,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    const address = await addressModel.findOne({
      _id: id,
      userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // If updated address becomes default
    if (isDefault) {
      await addressModel.updateMany(
        {
          userId,
          _id: { $ne: id },
        },
        {
          $set: { isDefault: false },
        }
      );
    }

    address.fullName = fullName;
    address.phone = phone;
    address.addressLine = addressLine;
    address.city = city;
    address.state = state;
    address.postalCode = postalCode;
    address.country = country;
    address.isDefault = isDefault;

    await address.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Update address error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update address",
      error: error.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const address = await addressModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Delete address error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete address",
      error: error.message,
    });
  }
};

export const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const address = await addressModel.findOne({
      _id: id,
      userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Remove default from all user's addresses
    await addressModel.updateMany(
      { userId },
      { $set: { isDefault: false } }
    );

    // Make selected address default
    address.isDefault = true;

    await address.save();

    res.status(200).json({
      success: true,
      message: "Default address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Set default address error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to set default address",
      error: error.message,
    });
  }
};