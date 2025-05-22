import { fetchUserRepository } from "@/repository/fetchUserRepository";
import "../globals.css";
import { Toaster } from "sonner";
import { redirect } from "next/navigation";

export default async function NoAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUserRepository();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <>
      {children}
      <Toaster richColors position="bottom-right" />
    </>
  );
}
