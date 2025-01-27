import jwt from "jsonwebtoken";
export const generateAccessToken = (id: string) => {
  const accessToken = jwt.sign(
    { id },
    process.env.ACCESS_TOKEN_SECRET || "fallbackAccessTokenSecret",
    { expiresIn: "1m" }
  );
  return accessToken;
};

export const generateRefreshToken = (id: string) => {
  const refreshToken = jwt.sign(
    { id },
    process.env.REFRESH_TOKEN_SECRET || "fallbackRefreshTokenSecret",

    { expiresIn: "7d" }
  );

  return refreshToken;
};

export const refreshAccessToken = (refreshToken: string) => {
  const secret =
    process.env.REFRESH_TOKEN_SECRET || "fallbackRefreshTokenSecret";
  const decoded = jwt.verify(refreshToken,secret);
};
