import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

export const Auth = () => {
  const session = useSession();

  return session ? <Outlet /> : <Navigate to="/login" replace />;
};
