import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

export const Auth = () => {
  const session = useSession();

  console.log(session);
  console.log(session?.provider_token);
  console.log(session?.access_token);
  console.log(session?.refresh_token);
  console.log(session?.provider_refresh_token);

  return session ? <Outlet /> : <Navigate to="/login" replace />;
};
