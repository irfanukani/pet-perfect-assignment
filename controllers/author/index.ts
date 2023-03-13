import { Author } from "@prisma/client";
import { Request, Response } from "express";
import * as z from "zod";
import prisma from "../../lib/prisma";
import { SignJWT } from "jose";

export const AuthorValidator = z.object({
  email: z.string().email(),
  name: z.string(),
  phone_no: z.string(),
});

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await prisma.author.findMany({
      include: {
        _count: true,
      },
    });
    res.json(authors);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getASingleAuthor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const validatedId = await z.string().parseAsync(id);

    const authors = await prisma.author.findMany({
      where: {
        id: parseInt(validatedId),
      },
      include: {
        books: true,
        likedBooks: true,
      },
    });
    res.json(authors);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCurrentAuthor = async (req: Request, res: Response) => {
  try {
    const email = req.user.email;
    const authors = await prisma.author.findMany({
      where: {
        email: email,
      },
      include: {
        books: true,
        likedBooks: true,
      },
    });
    res.json(authors);
  } catch (error) {
    res.status(500).json(error);
  }
};

/*
    !!IMP : Checks if email is present in the database
    Password Implementations are not done for demo purpose.
*/
export const loginAuthor = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const validatedEmail = await z.string().email().parseAsync(email);

    const author = await prisma.author.findFirstOrThrow({
      where: {
        email: validatedEmail,
      },
    });
    // Signing Token
    const token = await new SignJWT({ author })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("IrfanUkani")
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(process.env.PASSPORT_KEY));

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
    });

    res.send(author);
  } catch (error) {
    res.status(200).json({ error: error, message: "Authentication Failed" });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const author = req.body;

    const validatedAuthor = await AuthorValidator.parseAsync(author);
    await prisma.author.create({ data: validatedAuthor });

    res.status(201).json(validatedAuthor);
  } catch (error) {
    return res.status(400).json(error);
  }
};
