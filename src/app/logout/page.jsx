"use client";

import { useRouter } from "next/navigation";

const LOGOUT_URL = "/api/logout/";

export default function LogoutPage() {
  const router = useRouter();
  async function handle_button(event) {
    // prevent to show credentials in url
    event.preventDefault();

    const request_options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    };
    const response = await fetch(LOGOUT_URL, request_options);
    if (response.ok) {
      console.log("logged out");
      router.replace("/login");
    }
  }
  return (
    <div className="h-[95vh]">
      <h1 className="max-w-md mx-auto py-5">u wanna log out?</h1>
      <button className="bg-red-400 px-3 py-2" onClick={handle_button}>
        Logout
      </button>
    </div>
  );
}
