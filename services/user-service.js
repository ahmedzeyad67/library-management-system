import User from "../models/user-model.js";
import AppError from "../utils/app-error.js";
import paginate from "../utils/pagination.js";

const getAllUsers = async (queryParams) => {
  const { page, limit, ...query } = queryParams;

  const data = await paginate(User, query, { page, limit });

  return data;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const updateUser = async (userId, userData) => {
  const updatedUser = await User.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  return updatedUser;
};

const updateUserStatus = async (userId, isActive) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isActive },
    { new: true },
  );

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const activateUser = async (userId) => {
  const user = await updateUserStatus(userId, true);

  return user;
};

const deactivateUser = async (userId) => {
  const user = await updateUserStatus(userId, false);

  return user;
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  activateUser,
  deactivateUser,
};
