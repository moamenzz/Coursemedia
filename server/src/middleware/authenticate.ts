import { Request, RequestHandler, Response } from "express";
import appAssert from "../utils/AppAssert";
import { UNAUTHORIZED } from "../constants/HttpStatusCode";
import AppErrorCode from "../constants/AppErrorCode";
import {
  AccessTokenPayload,
  accessTokenSignOptions,
  verifyToken,
} from "../utils/jwtTokens";

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Access Token not Found",
    AppErrorCode.InvalidAccessToken
  );

  const { payload } = verifyToken<AccessTokenPayload>(accessToken, {
    secret: accessTokenSignOptions.secret,
  });
  appAssert(
    payload,
    UNAUTHORIZED,
    "Invalid Access Token",
    AppErrorCode.InvalidAccessToken
  );

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;
  next();
};

export default authenticate;
