import { fetchUserRepository } from "@/repository/fetchUserRepository";
import { redirect } from "next/navigation";
import Footer from "@/components/layouts/footer-page";
import Header from "@/components/layouts/header-page";

export default async function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUserRepository();

  if (!user) {
    redirect("/login");
  }

  if (!user.user.email_verified_at) {
    redirect("/account/verify");
  }

  if (user?.user.company_id) {
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
