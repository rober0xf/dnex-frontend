"use client";

const LOGIN_URL = "http://127.0.0.1:8000/api/token/pair";
export default function LoginPage() {
  async function handle_submit(event) {
    // prevent to show credentials in url
    event.preventDefault();

    // parse the data from the form to an js form data
    const form_data = new FormData(event.target);

    // we need to parse the data as an object to cast it to json
    const object_from_form = Object.fromEntries(form_data);
    const json_data = JSON.stringify(object_from_form);
    const request_options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json_data,
    };
    const response = await fetch(LOGIN_URL, request_options);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      console.log("logged in");
    }
  }
  return (
    <div className="h-[95vh]">
      <h1 className="max-w-md mx-auto py-5">Login Page</h1>
      <form onSubmit={handle_submit}>
        <input
          type="text"
          name="username"
          placeholder="your username"
          required
        ></input>
        <input
          type="password"
          name="password"
          placeholder="your password"
          required
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
