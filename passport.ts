import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import prisma from "./lib/prisma";
require("dotenv").config();

var cookieExtractor = function (req: any) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

export const initializePassport = (passport: any) => {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.PASSPORT_KEY,
      },
      (payload, done) => {
        prisma.author
          .findFirst({
            where: {
              email: payload.author.email,
            },
          })
          .then((data: any) => done(null, data))
          .catch((error) => done(error, false));
      }
    )
  );
  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: any, done: any) => {
    try {
      const user: any = await prisma.author.findUniqueOrThrow({
        where: { id: id },
      });
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
