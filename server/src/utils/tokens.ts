import jwt, { JwtPayload } from "jsonwebtoken";

const accessTokenExpiry  = process.env.ACCESS_TOKEN_EXPIRY || "15m"
const refreshTokenExpiry  = process.env.REFRESH_TOKEN_EXPIRY|| "7d"
export const generateAccessToken = (id: string) => {
  const accessToken = jwt.sign(
    { id },
    process.env.ACCESS_TOKEN_SECRET || "fallbackAccessTokenSecret",
    { expiresIn: accessTokenExpiry }
  );
  return accessToken;
};

export const generateRefreshToken = (id: string) => {
  const refreshToken = jwt.sign(
    { id },
    process.env.REFRESH_TOKEN_SECRET || "fallbackRefreshTokenSecret",

    { expiresIn: refreshTokenExpiry }
  );

  return refreshToken;
};

export const refreshAccessToken = (refreshTokenId: string | JwtPayload) => {
  const newAccessToken = jwt.sign(
    { id: refreshTokenId },
    process.env.ACCESS_TOKEN_SECRET || "fallbackAccessTokenSecret",
    { expiresIn: accessTokenExpiry }
  );
  const newRefreshToken = jwt.sign(
    { id: refreshTokenId },
    process.env.REFRESH_TOKEN_SECRET || "fallbackRefreshTokenSecret",
    { expiresIn: refreshTokenExpiry }
  );

  return {newAccessToken,newRefreshToken}
};
