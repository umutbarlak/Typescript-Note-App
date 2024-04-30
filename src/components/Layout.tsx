import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../types";

type LayoutPropsType = {
  notes: Note[];
};

const Layout = ({ notes }: LayoutPropsType) => {
  const { id } = useParams();

  const founded = notes.find((n) => n.id === id);

  if (!founded) return <Navigate to={"/"} />;

  return <Outlet context={founded} />;
};

export default Layout;
