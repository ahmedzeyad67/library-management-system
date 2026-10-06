import asyncWrapper from "../middlewares/async-wrapper.js";
import authService from "../services/auth-service.js";

const register = asyncWrapper(async (req, res) => {
  const { accessToken, refreshToken } = await authService.registerUser(
    req.body,
  );

  res
    .status(201)
    .json({ status: "success", data: { accessToken, refreshToken } });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await authService.loginUser(
    email,
    password,
  );

  res
    .status(200)
    .json({ status: "success", data: { accessToken, refreshToken } });
});

const logout = asyncWrapper(async (req, res) => {
  const { refreshToken } = req.body;

  await authService.logoutUser(refreshToken);

  res.status(200).json({ status: "success", data: null });
});

const refresh = asyncWrapper(async (req, res) => {
  const { refreshToken } = req.body;

  const { accessToken, refreshToken: newRefreshToken } =
    await authService.refreshUserTokens(refreshToken);

  res.status(200).json({
    status: "success",
    data: { accessToken, refreshToken: newRefreshToken },
  });
});

const getMe = asyncWrapper(async (req, res) => {
  const user = await authService.getMe(req.user.id);

  res.status(200).json({ status: "success", data: user });
});

const changePassword = asyncWrapper(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await authService.changePassword(req.user.id, currentPassword, newPassword);

  res.status(200).json({ status: "success", data: null });
});

export default {
  register,
  login,
  logout,
  refresh,
  getMe,
  changePassword,
};
