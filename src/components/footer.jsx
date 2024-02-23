import { Link } from "react-router-dom";
import useLocale from "../hooks/use-locale";

export default function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="my-10 text-center">
      <p>
        &copy;{new Date().getFullYear()}{" "}
        <span className="font-medium">
          {locale === "id" ? "Dibuat oleh" : "Created By"}
        </span>{" "}
        <Link
          to="https://www.linkedin.com/in/nelan17/"
          target="_blank"
          className="text-purple-500"
        >
          <strong>Nelan</strong> 😎
        </Link>
      </p>
    </footer>
  );
}
