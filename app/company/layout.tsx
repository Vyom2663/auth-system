import { fetchUserRepository } from "@/repository/fetchUserRepository";
import { redirect } from "next/navigation";

export default async function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUserRepository();

  if(!user){
    redirect("/login");
  }

  if (!user.email_verified_at) {
  redirect("/account/verify");
  }

  if (user?.company_id) {
    redirect("/dashboard");
  }

  return (
    <>
      {children}
    </>
  );
}
