"use server";
// file to handle cookies
import {
  get_refresh_token,
  get_token,
  set_refresh_token,
  set_token,
} from "@/app/lib/auth";
import { NextResponse } from "next/server";

const DJANGO_LOGIN_URL = "http://127.0.0.1:8000/api/token/pair";

export async function POST(request) {
  const my_auth_token = get_token();
  const my_auth_refresh_token = get_refresh_token();
  console.log(my_auth_token, my_auth_refresh_token);

  const request_data = await request.json();
  const json_data = JSON.stringify(request_data);
  const request_options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: json_data,
  };

  const response = await fetch(DJANGO_LOGIN_URL, request_options);
  const response_data = await response.json();
  console.log(response_data);
  if (response.ok) {
    const { access, refresh } = response_data; // take the token from the response
    set_token(access);
    set_refresh_token(refresh);
    return NextResponse.json({ message: "logged in" }, { status: 200 });
  }

  return NextResponse.json(
    { message: "could not log in", ...response_data },
    { status: 200 },
  );
}
