import Footer from "@/components/layouts/footer-page";
import Header from "@/components/layouts/header-page";
import { fetchUserRepository } from "@/repository/fetchUserRepository";
import { redirect } from "next/navigation";

export default async function VerifyEmailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUserRepository();

  if (user?.user.email_verified_at) {
    redirect("/dashboard");
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
