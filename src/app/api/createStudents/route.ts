import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Request body is empty or invalid" },
        { status: 400 }
      );
    }

    const { name, cohortId, courseIds, classId } = body;

    if (
      !name ||
      !cohortId ||
      !courseIds ||
      !classId ||
      !Array.isArray(courseIds)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid input data" },
        { status: 400 }
      );
    }

    const student = await prisma.student.create({
      data: {
        name,
        cohort: {
          connect: { id: cohortId },
        },
        class: {
          connect: { id: classId },
        },
        courses: {
          connect: courseIds.map((id: string) => ({ id })),
        },
      },
      include: {
        cohort: true,
        courses: true,
        class: true,
      },
    });

    return NextResponse.json({ success: true, data: student }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating student:", error);

    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
