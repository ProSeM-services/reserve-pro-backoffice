import { Link } from "react-router";
import { LoginForm, RegisterForm } from "../components";
import { BackgroundMark } from "@/components/common/BackgroundMark";
import { ResetPassword } from "@/pages/reset-passowd/components/reset-password";
type PageType = "login" | "register" | "reset-password";
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
  "reset-password": {
    title: "Recuperar contraseña",
    description: "Ingresar tu inforamción para crear una cuenta en ReservePro",
    footerMessage: "Ya tenés cuenta?",
    oppositeLink: "Iniciar Sesión",
    oppositeRoute: "/login",
  },
};
export function AuthPage({ type }: AuthPageProps) {
  const { footerMessage, oppositeLink, oppositeRoute } = Config[type];
  return (
    <div className="w-full min-h-screen h-screen     overflow-hidden  ">
      <div className="    -z-0 ">
        <BackgroundMark />
      </div>
      <div className=" flex flex-col items-center justify-center gap-8  h-full max-w-md max-md:max-w-sm mx-auto max-md:p-8  ">
        <div className="  w-full max-w-sm flex justify-center items-center ">
          <img
            src="/images/reserve-pro-high-resolution-logo-transparent.png"
            className="w-[250px] object-cover"
          />
        </div>

        <div className="flex flex-col  w-full gap-4 z-10">
          <div className=" w-full  z-10 ">
            {type === "login" && <LoginForm />}
            {type === "register" && <RegisterForm />}
            {type === "reset-password" && <ResetPassword />}
          </div>
          <div className=" text-center text-sm flex gap-3 items-center   justify-center">
            <p>{footerMessage}</p>
            <Link to={oppositeRoute} className="underline">
              {oppositeLink}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
