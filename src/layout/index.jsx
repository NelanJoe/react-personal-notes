import { Outlet } from "react-router-dom";

import Hero from "../components/hero";

export default function Layout() {
  return (
    <>
      <Hero />
      <Outlet />
    </>
  );
}
