import { GraphQLError } from "graphql";
import User from "../models/user.model.js";
import {
  generateToken,
  setCookieToken,
} from "../../../common/authMiddleware.js";

const userResolvers = {
  Query: {
    verify: (_, __, { req, res, user }) => {
      const token = req.cookies?.token;
      if (!token) {
        throw new GraphQLError(
          "No token provided. Please log in to access this resource.",
          {
            extensions: { code: "UNAUTHENTICATED" },
          }
        );
      } else if (!user) {
        throw new GraphQLError(
          "Invalid token. Please log in to access this resource.",
          {
            extensions: { code: "FORBIDDEN" },
          }
        );
      }
      return user;
    },
  },
  Mutation: {
    signup: async (_, args, { user }) => {
      if (!!user) {
        throw new GraphQLError(
          "User already logged in. Please log out before signing up.",
          {
            extensions: { code: "USER_ALREADY_LOGGED_IN" },
          }
        );
      }
      try {
        const _user = new User(args);
        await _user.save();
        return true;
      } catch (error) {
        let errors = [];

        if (error.name === "ValidationError") {
          errors = Object.keys(error.errors).map((field) => ({
            field,
            message: `${field} is invalid or missing.`,
          }));
        }

        if (error.code === 11000) {
          const field = Object.keys(error.keyPattern)[0];
          errors.push({
            field,
            message: `The ${field} "${
              Object.values(error.keyValue)[0]
            }" is already taken.`,
          });
        }

        if (errors.length > 0) {
          throw new GraphQLError("Validation failed", {
            extensions: {
              code: "BAD_VITAL_SIGN_INPUT",
              errors,
            },
          });
        } else {
          throw error;
        }
      }
    },
    login: async (_, { username, password }, { res, user, isFromGateway }) => {
      if (!!user) {
        throw new GraphQLError("User already authenticated", {
          extensions: { code: "USER_ALREADY_AUTHENTICATED" },
        });
      } else {
        try {
          const user = await User.findOne({ username });
          if (!!user && user.comparePassword(password)) {
            const token = generateToken(user.toJSON());
            setCookieToken(res, token);
            if (isFromGateway) {
              return { ...user.toJSON(), token };
            } else {
              return user.toJSON();
            }
          } else {
            throw Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Error login", error.message);
          throw new GraphQLError("Invalid credentials", {
            extensions: { code: "INVALID_CREDENTIALS" },
          });
        }
      }
    },
    logout: (_, __, { res }) => {
      res.clearCookie("token");
      return true;
    },
  },
};

export default userResolvers;
