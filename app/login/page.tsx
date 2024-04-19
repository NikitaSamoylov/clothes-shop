import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "TJ | страница входа"
};

const LoginPage: React.FC = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/')
  };

  return (
    <section>
      <div className="container">
        <AuthForm />
      </div>
    </section>
  )
};

export default LoginPage;