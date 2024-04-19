import { Metadata } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "TJ | новый аккаунт"
};

const SignupPage: React.FC = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/')
  }

  return (
    <section>
      <div className="container">
        <SignupForm />
      </div>
    </section>

  )
};

export default SignupPage;