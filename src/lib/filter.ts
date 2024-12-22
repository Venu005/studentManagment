import prisma from "./db";

export async function getClasses(teacherId: string) {
  try {
    const classes = await prisma.class.findMany({
      where: {
        teachers: {
          some: {
            id: teacherId,
          },
        },
      },
      include: {
        students: true,
      },
    });

    return classes;
  } catch (error) {
    console.error("Error fetching classes", error);
  }
}
