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

export async function getCourses(teacherId: string) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        teacherId,
      },
    });

    return courses;
  } catch (error) {
    console.error("Error fetching classes", error);
  }
}
