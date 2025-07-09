const { cookies } = require("next/headers");

const TOKEN_AGE = 3600;
const TOKEN_NAME = "auth-token";
const TOKEN_REFRESH_NAME = "auth-refresh-token";

// api request
export async function get_token() {
  const auth_token = (await cookies()).get(TOKEN_NAME);
  return auth_token?.value;
}

export async function get_refresh_token() {
  const auth_refresh_token = (await cookies()).get(TOKEN_REFRESH_NAME);
  return auth_refresh_token?.value;
}

// login
export async function set_token(auth_token) {
  return (await cookies()).set({
    name: TOKEN_NAME,
    value: auth_token,
    httpOnly: true, // js client dont have access to it
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: TOKEN_AGE,
  });
}

export async function set_refresh_token(auth_refresh_token) {
  return (await cookies()).set({
    name: TOKEN_REFRESH_NAME,
    value: auth_refresh_token,
    httpOnly: true, // js client dont have access to it
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: TOKEN_AGE,
  });
}

// logout
export function delete_token() {
  cookies().delete(TOKEN_REFRESH_NAME);
  return cookies().delete(TOKEN_NAME);
}
