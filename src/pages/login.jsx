import PropTypes from "prop-types";

import LoginForm from "../components/login-form";

import { login } from "../utils/api";
import useLocale from "../hooks/use-locale";
import toast from "react-hot-toast";

export default function Login({ loginSuccess }) {
  const { locale } = useLocale();

  const onLoginHandler = async (userLogin) => {
    const { error, data } = await login(userLogin);

    if (!error) {
      loginSuccess(data);
      toast.success("Successfully login");
    }
  };

  return (
    <section>
      <h2 className="my-6 text-xl font-semibold text-center">
        {locale === "id" ? (
          <span>Silakan 🙏, Login di sini 😊!</span>
        ) : (
          <span>Please 🙏, Login Here 😊!</span>
        )}
      </h2>
      <LoginForm onLogin={onLoginHandler} />
    </section>
  );
}

Login.propTypes = {
  loginSuccess: PropTypes.func,
};
