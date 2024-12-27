import { Link } from "react-router";
import { LoginForm, RegisterForm } from "../components";
import { BackgroundMark } from "@/components/common/BackgroundMark";
type PageType = "login" | "register";
interface AuthPageProps {
  type: PageType;
}
interface IConfigBody {
  title: string;
  description: string;
  footerMessage: string;
  oppositeLink: string;
  oppositeRoute: string;
}
const Config: Record<PageType, IConfigBody> = {
  login: {
    title: "Log In",
    description: "Enter your email below to login to your account",
    footerMessage: " Don't have an account?",
    oppositeLink: "  Sign up",
    oppositeRoute: "/register",
  },
  register: {
    title: "Register",
    description: "Enter your email below to create your account",
    footerMessage: "Do you have an account?",
    oppositeLink: "Sign in",
    oppositeRoute: "/login",
  },
};
export function AuthPage({ type }: AuthPageProps) {
  const { description, footerMessage, oppositeLink, oppositeRoute, title } =
    Config[type];
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]  h-screen   ">
      <div className="flex items-center justify-center py-12  h-full  ">
        <div className="  lg:hidden  -z-0 ">
          <BackgroundMark />
        </div>
        <div className="mx-auto grid md:w-[450px] max-md:w-5/6  gap-6 z-10 ">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-balance text-muted-foreground">{description}</p>
          </div>
          {type === "login" ? <LoginForm /> : <RegisterForm />}

          <div className="mt-4 text-center text-sm flex gap-3 items-center  justify-center">
            <p>{footerMessage}</p>
            <Link to={oppositeRoute} className="underline">
              {oppositeLink}
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden  lg:block relative ">
        <BackgroundMark />
      </div>
    </div>
  );
}
