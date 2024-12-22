import prisma from "./db";

export async function getStudents(teacherId: string) {
  try {
    const students = await prisma.student.findMany({
      where: {
        class: {
          teachers: {
            some: {
              id: teacherId,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        lastLogin: true,
        createdAt: true,
        cohort: {
          select: {
            academicYear: true,
          },
        },
        courses: {
          select: {
            name: true,
          },
        },
        class: {
          select: {
            name: true,
          },
        },
      },
    });
    return students;
  } catch (error) {
    console.error("Error in fetching students", error);
    throw new Error("Could not fetch students");
  }
}
