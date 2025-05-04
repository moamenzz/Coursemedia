import passport from "passport";
import UserModel from "../models/user.model";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../constants/getENV";
import axios from "axios";

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({
          $or: [{ googleId: profile.id }, { email: profile.emails?.[0].value }],
        });

        if (!user) {
          user = await UserModel.create({
            email: profile.emails?.[0].value,
            username: profile.displayName,
            googleId: profile.id,
            verified: true,
          });
        } else if (!user.googleId) {
          user.googleId = profile.id;
          if (!user.verified) user.verified = true;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

interface GithubProfile {
  id: string;
  username: string;
  displayName: string;
  emails?: { value: string }[];
}

interface GithubStrategyCallback {
  (
    accessToken: string,
    refreshToken: string,
    profile: GithubProfile,
    done: (error: Error | null, user?: any) => void
  ): void;
}

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
      scope: ["user:email"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: GithubProfile,
      done: (error: Error | null, user?: any) => void
    ) => {
      try {
        const emailResponse = await axios.get(
          "https://api.github.com/user/emails",
          {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          }
        );

        // Finde die primäre E-Mail-Adresse
        const primaryEmail = emailResponse.data.find(
          (email: any) => email.primary
        )?.email;

        if (!primaryEmail) {
          throw new Error("No primary email found for GitHub user");
        }

        let user = await UserModel.findOne({
          $or: [{ githubId: profile.id }, { email: profile.emails?.[0].value }],
        });

        if (!user) {
          user = await UserModel.create({
            email: profile.emails?.[0].value,
            username: profile.username || profile.displayName,
            githubId: profile.id,
            verified: true,
          });
        } else if (!user.githubId) {
          user.githubId = profile.id;
          if (!user.verified) user.verified = true;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

export default passport;
