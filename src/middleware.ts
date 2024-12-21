import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from ".@/lib.db";
const secret = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secret);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token) {
    return NextResponse.next();
  }
  try {
    const payload = await jwtVerify(token.value, key);
    const teacherId = payload.teacherId as string;
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: teacherId,
      },
    });
    if (teacher) {
      const res = NextResponse.next();
      const teacherData = JSON.stringify(teacher);
      res.headers.set("s-teacher-data", teacherData);
      res.cookies.set("teacher-data", teacherData, {
        httpOnly: true,
      });
    }
  } catch (error) {
    console.error(error);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
