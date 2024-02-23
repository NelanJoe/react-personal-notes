import PropTypes from "prop-types";

import { useInput } from "../hooks/use-input";
import { Link } from "react-router-dom";
import useLocale from "../hooks/use-locale";

export default function RegisterForm({ onRegister }) {
  const { locale } = useLocale();

  const [name, onChangeName] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) return;

    onRegister({ name, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 py-4 border-2 border-purple-500 border-dashed rounded-md shadow-md lg:px-6 lg:py-7"
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">{locale === "id" ? "Nama" : "Name"}</label>
          <input
            className="w-full p-2.5 border focus:outline-purple-500 shadow-sm lg:p-3 rounded-xl dark:bg-gray-100 dark:text-slate-900"
            id="name"
            type="text"
            placeholder="johndoe"
            value={name}
            onChange={onChangeName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="w-full p-2.5 border focus:outline-purple-500 shadow-sm lg:p-3 rounded-xl dark:bg-gray-100 dark:text-slate-900"
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">
            {locale === "id" ? "Kata Sandi" : "Password"}
          </label>
          <input
            className="w-full p-2.5 border focus:outline-purple-500 shadow-sm lg:p-3 rounded-xl dark:bg-gray-100 dark:text-slate-900"
            id="password"
            type="password"
            placeholder="*******"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-purple-500 shadow-sm rounded-xl"
          >
            {locale === "id" ? "Daftar" : "Register"}
          </button>
        </div>
      </div>
      <div className="mt-3">
        <p>
          {locale === "id" ? (
            <>
              Sudah punya akun?
              <Link to="/" className="italic text-purple-500 underline">
                Masuk disini
              </Link>
            </>
          ) : (
            <>
              Already have an account?
              <Link to="/" className="italic text-purple-500 underline">
                Login here
              </Link>
            </>
          )}
        </p>
      </div>
    </form>
  );
}

RegisterForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
};
