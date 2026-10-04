import asyncWrapper from "../middlewares/async-wrapper.js";
import userService from "../services/user-service.js";

const getAllUsers = asyncWrapper(async (req, res) => {
  const data = await userService.getAllUsers(req.query);

  res.json({
    status: "success",
    data,
  });
});

const getUserById = asyncWrapper(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  res.json({ status: "success", data: { user } });
});

const updateUser = asyncWrapper(async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.userId, req.body);

  res.json({ status: "success", data: { user: updatedUser } });
});

const activateUser = asyncWrapper(async (req, res) => {
  const user = await userService.activateUser(req.params.userId);

  res.json({ status: "success", data: { user } });
});

const deactivateUser = asyncWrapper(async (req, res) => {
  const user = await userService.deactivateUser(req.params.userId);

  res.json({ status: "success", data: { user } });
});

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
  activateUser,
};
