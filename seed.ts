import prisma from "./lib/prisma";
import { faker } from "@faker-js/faker";

function generateFakeData() {
  const fakeData: any = [];
  const fakeBookData: any = [];

  for (let index = 0; index < 100; index++) {
    fakeData.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      phone_no: faker.phone.number(),
    });
  }

  for (let index = 0; index < 100; index++) {
    fakeBookData.push({
      title: faker.name.firstName() + " " + faker.name.jobArea(),
      authorId: faker.datatype.number({ min: 1, max: 99 }),
    });
  }
  return { fakeBookData, fakeData };
}

async function seedData() {
  console.log("SEEDING DATABASE");
  await prisma.author.createMany({ data: generateFakeData().fakeData });
  await prisma.book.createMany({ data: generateFakeData().fakeBookData });
}

seedData().then(() => {
  console.log("SEEDING COMPLETE.");
});
