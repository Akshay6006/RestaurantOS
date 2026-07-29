export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected Route Access Granted",
    user: req.user,
  });
};