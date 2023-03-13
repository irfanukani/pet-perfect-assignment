import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import * as z from "zod";

const BookValidator = z.object({
  title: z.string(),
  authorId: z.number(),
});

export const createABook = async (req: Request, res: Response) => {
  try {
    const book = req.body;
    const validatedBook = await BookValidator.parseAsync(book);
    const createdBook = await prisma.book.create({ data: validatedBook });
    res.json(createdBook);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const likeABook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const validatedBookId = await z.string().parseAsync(bookId);

    const createdLike = await prisma.likes.findFirst({
      where: {
        authorId: parseInt(req.user.id),
        bookId: parseInt(validatedBookId),
      },
    });

    if (!createdLike) {
      const newLike = await prisma.likes.create({
        data: {
          authorId: parseInt(req.user.id),
          bookId: parseInt(validatedBookId),
        },
      });
      return res.json(newLike);
    }

    res.json({ error: "Book is Already Liked!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const unlikeABook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const validatedBookId = await z.string().parseAsync(bookId);

    const likeExists = await prisma.likes.findFirst({
      where: {
        authorId: parseInt(req.user.id),
        bookId: parseInt(validatedBookId),
      },
    });

    if (likeExists) {
      const removedLike = await prisma.likes.delete({
        where: {
          id: likeExists.id,
        },
      });
      return res.json(removedLike);
    }

    res.json({ error: "Book is not liked!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPaginatedBooks = async (req: Request, res: Response) => {
  try {
    const pageNumber = await z.string().parseAsync(req.params.id);
    const allBooksPaginated = await prisma.book.findMany({
      take: 20,
      skip: parseInt(pageNumber) * 20,
    });
    res.json(allBooksPaginated);
  } catch (error) {
    res.status(500).json(error);
  }
};
