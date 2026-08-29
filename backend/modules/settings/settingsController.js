import authModel from "../auth/authModel.js";

export const getUserSettings = async (req, res) => {
  const user = await authModel.findById(req.user.id);

  if (user.role !== "user") {
    return res.status(403).json({
      message: "Only users allowed",
    });
  }

  res.json({
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      notification: user.notification,
      theme: user.theme,
    },
  });
};

export const getAdminSettings = async (req, res) => {
  const user = await authModel.findById(req.user.id);

  if (user.role !== "admin") {
    return res.status(403).json({
      message: "Only admins allowed",
    });
  }
res.json({
  data: {
    name: user.name,
    email: user.email,
    role: user.role,
    notification: user.notification,
    theme: user.theme,
  },
});
};

export const updateSettings = async (req, res) => {
  try {
    const { name, notification, theme } = req.body;

    const updatedUser = await authModel.findByIdAndUpdate(
      req.user.id,

      {
        name,
        notification,
        theme,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      message: "Settings updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
