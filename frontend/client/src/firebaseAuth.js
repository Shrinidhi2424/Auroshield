import { auth } from "./firebase"; // your Firebase auth setup

export const getCurrentUserUid = () => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not logged in");
  return currentUser.uid;
};
