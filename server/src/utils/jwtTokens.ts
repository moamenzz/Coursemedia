import { SignOptions, VerifyOptions } from "jsonwebtoken";
import { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants/getENV";
import jwt from "jsonwebtoken";

export interface RefreshTokenPayload {
  sessionId: SessionDocument["_id"];
}

export interface AccessTokenPayload extends RefreshTokenPayload {
  userId: UserDocument["_id"];
}

const defaults: SignOptions = {
  audience: ["user"],
};

interface SignOptionsAndSecret extends SignOptions {
  secret: string;
}

interface VerifyOptionsAndSecret extends VerifyOptions {
  secret: string;
}

export const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15min",
  secret: ACCESS_TOKEN_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "7d",
  secret: REFRESH_TOKEN_SECRET,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  signOptions: SignOptionsAndSecret
) => {
  const { secret, ...signOpts } = signOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...signOpts,
  });
};

export const verifyToken = <TPayload extends object>(
  token: string,
  verifyOptions: VerifyOptionsAndSecret
) => {
  const { secret, ...verifyOpts } = verifyOptions;
  const payload = jwt.verify(token, secret, {
    ...defaults,
    ...verifyOpts,
  }) as TPayload;
  return { payload };
};
