import { delete_token } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  delete_token();
  return NextResponse.json({}, { status: 200 });
}
