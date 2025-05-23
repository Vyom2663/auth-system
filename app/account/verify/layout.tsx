import { fetchUserRepository } from "@/repository/fetchUserRepository";
import { redirect } from "next/navigation";

export default async function VerifyEmailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUserRepository();

  if (user?.email_verified_at) {
    redirect("/dashboard");
  }

  return (
    <>
      {children}
    </>
  );
}
