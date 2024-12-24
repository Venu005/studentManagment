import { getCourses } from "@/lib/filter";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const teacherId = url.searchParams.get("teacherId");
    if (!teacherId) {
      return NextResponse.json(
        { success: false, data: "Teacher ID is required" },
        { status: 400 }
      );
    }
    const res = await getCourses(teacherId);
    
    return NextResponse.json(
      {
        success: true,
        data: res,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: error,
      },
      {
        status: 400,
      }
    );
  }
}
