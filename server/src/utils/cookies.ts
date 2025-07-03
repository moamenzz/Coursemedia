import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/getENV";

const secure = NODE_ENV === "development" ? false : true;
const sameSite = NODE_ENV === "development" ? "lax" : "none";

const defaults: CookieOptions = {
  sameSite: sameSite,
  httpOnly: true,
  secure: secure,
};

export const accessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: new Date(Date.now() + 15 * 60 * 1000),
});

export const refreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  path: "/auth/refresh",
});

interface SetCookiesParams {
  res: Response;
  accessToken: string;
  refreshToken: string;
}

export const setCookies = ({
  res,
  accessToken,
  refreshToken,
}: SetCookiesParams) =>
  res
    .cookie("accessToken", accessToken, accessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, refreshTokenCookieOptions());

export const clearCookies = (res: Response) =>
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: NODE_ENV === "development" ? false : true,
      sameSite: NODE_ENV === "development" ? "lax" : "none",
      path: "/",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: NODE_ENV === "development" ? false : true,
      sameSite: NODE_ENV === "development" ? "lax" : "none",
      path: "/auth/refresh",
    });
