"use server";

import { signup } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const res = await signup(name, email, password);
    return NextResponse.json(
      {
        success: true,
        data: res,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      status: 400,
    });
  }
}
