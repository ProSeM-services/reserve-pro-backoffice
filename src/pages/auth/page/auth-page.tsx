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
    title: "Iniciar Sesion",
    description: "Enter your email below to login to your account",
    footerMessage: " No tenés cuenta?",
    oppositeLink: "  Registrate",
    oppositeRoute: "/register",
  },
  register: {
    title: "Crear cuenta",
    description: "Ingresar tu inforamción para crear una cuenta en ReservePro",
    footerMessage: "Ya tenés cuenta?",
    oppositeLink: "Iniciar Sesión",
    oppositeRoute: "/login",
  },
};
export function AuthPage({ type }: AuthPageProps) {
  const { footerMessage, oppositeLink, oppositeRoute, title } = Config[type];
  return (
    <div className="w-full  h-screen   ">
      <div className="    -z-0 ">
        <BackgroundMark />
      </div>
      <div className="flex items-center justify-center py-12  h-full outline ">
        <div className="mx-auto grid md:w-[450px] max-md:w-5/6  gap-6 z-10 ">
          <div className=" h-full w-full flex items-center justify-center">
            <img
              src="/images/reserve-pro-high-resolution-logo-transparent.png"
              className="w-[250px] object-cover"
            />
          </div>
          <h1 className=" text-center">{title}</h1>

          {type === "login" ? <LoginForm /> : <RegisterForm />}

          <div className="mt-4 text-center text-sm flex gap-3 items-center  justify-center">
            <p>{footerMessage}</p>
            <Link to={oppositeRoute} className="underline">
              {oppositeLink}
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="hidden  lg:block relative  ">
        <BackgroundMark />
        <div className=" h-full w-full flex items-center justify-center">
          <img
            src="/images/reserve-pro-high-resolution-logo-transparent.png"
            className="object-cover w-1/2"
          />
        </div>
      </div> */}
    </div>
  );
}
