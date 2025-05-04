import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/getENV";

const secure = NODE_ENV === "development" ? false : true;

const defaults: CookieOptions = {
  sameSite: "strict",
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
  res.clearCookie("accessToken").clearCookie("refreshToken", {
    path: "/auth/refresh",
  });
