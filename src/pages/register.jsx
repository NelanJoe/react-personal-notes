import RegisterForm from "../components/register-form";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/api";
import useLocale from "../hooks/use-locale";
import toast from "react-hot-toast";

export default function Register() {
  const { locale } = useLocale();
  const navigate = useNavigate();

  const onRegisterHandler = async (userRegister) => {
    const { error } = await register(userRegister);

    if (!error) {
      toast.success("Successfully register");
      navigate("/");
    }
  };

  return (
    <section>
      <h2 className="my-6 text-xl font-semibold text-center">
        {locale === "id" ? "Daftar dulu 😊" : "Register Here 😊"}
      </h2>
      <RegisterForm onRegister={onRegisterHandler} />
    </section>
  );
}

Register.propTypes = {};
