// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create teacher
  const teacher = await prisma.teacher.create({
    data: {
      id: "cm4x0srdj0000moxjzptlq1cv",
      name: "John Doe",
      email: "123@gmail.com",
      password: "password",
    },
  });

  // Create cohort
  const cohort = await prisma.cohort.create({
    data: {
      id: "cohort1",
      academicYear: "AY 2024-25",
    },
  });

  // Create courses
  const course1 = await prisma.course.create({
    data: {
      id: "course1",
      name: "CBSE SCIENCE 9",
      teacherId: teacher.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      id: "course2",
      name: "CGSE MATH 9",
      teacherId: teacher.id,
    },
  });

  // Create students
  const student1 = await prisma.student.create({
    data: {
      id: "student1",
      name: "Alice Smith",
      cohortId: cohort.id,
    },
  });

  const student2 = await prisma.student.create({
    data: {
      id: "student2",
      name: "Bob Johnson",
      cohortId: cohort.id,
    },
  });

  // Enroll students in courses
  await prisma.course.update({
    where: { id: course1.id },
    data: {
      students: {
        connect: [{ id: student1.id }, { id: student2.id }],
      },
    },
  });

  await prisma.course.update({
    where: { id: course2.id },
    data: {
      students: {
        connect: [{ id: student1.id }],
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
