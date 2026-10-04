import { createHash } from "crypto";

const hashToken = (token) => {
  return createHash("sha256").update(token).digest("hex");
};

export default hashToken;
