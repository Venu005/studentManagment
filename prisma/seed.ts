// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create cohort
  const cohort = await prisma.cohort.create({
    data: {
      id: "cohort1",
      academicYear: "AY 2024-25",
    },
  });

  // Create classes
  const class1 = await prisma.class.create({
    data: {
      id: "class1",
      name: "Class 1",
      academicYear: "AY 2024-25",
    },
  });

  const class2 = await prisma.class.create({
    data: {
      id: "class2",
      name: "Class 2",
      academicYear: "AY 2024-25",
    },
  });

  // Create teacher
  const teacher = await prisma.teacher.create({
    data: {
      id: "teacher1",
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "hashedpassword",
      classes: {
        connect: [{ id: class1.id }, { id: class2.id }],
      },
    },
  });

  // Create students
  const student1 = await prisma.student.create({
    data: {
      id: "student1",
      name: "Alice Smith",
      cohortId: cohort.id, // Use the created cohort's ID
      classId: class1.id,
    },
  });

  const student2 = await prisma.student.create({
    data: {
      id: "student2",
      name: "Bob Johnson",
      cohortId: cohort.id, // Use the created cohort's ID
      classId: class2.id,
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

  // Enroll students in courses
  await prisma.course.update({
    where: { id: course1.id },
    data: {
      students: {
        connect: [{ id: student1.id }],
      },
    },
  });

  await prisma.course.update({
    where: { id: course2.id },
    data: {
      students: {
        connect: [{ id: student2.id }],
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