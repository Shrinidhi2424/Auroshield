import { API_URL } from "../config";
import { auth } from "../firebase";

export async function registerUserInBackend() {
  const user = auth.currentUser;
  if (!user) throw new Error("No logged in user");

  await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid: user.uid, name: user.displayName, email: user.email }),
  });
}
