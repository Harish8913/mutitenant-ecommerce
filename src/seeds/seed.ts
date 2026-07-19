import { prisma } from "../lib/prisma.js";

const roleSeeder = async () => {
  console.log("Role Seeding Started: ");

  try {
    await prisma.role.deleteMany();

    await prisma.role.createMany({
      data: [
        {
          id: 1010,
          roleDescription: "Super User Admin",
        },

        {
          id: 2020,
          roleDescription: "Seller",
        },

        {
          id: 3030,
          roleDescription: "Customer",
        },
      ],
    });
  } catch (err) {
    console.log(err);
    throw new Error("Some error while seeding role data");
  } finally {
    console.log("Seeding Operation Stopped");
  }
};

roleSeeder();
