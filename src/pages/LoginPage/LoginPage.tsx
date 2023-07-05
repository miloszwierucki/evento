import { Center, Stack, Title } from "@mantine/core";
import { GoogleButton } from "../../components/GooglButton/GoogleButton";
import { Navigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

export const LoginPage = () => {
  const session = useSession();

  return !session ? (
    <Center sx={{ width: "100%", height: "80%" }}>
      <Stack align="center">
        <Title order={1}>Evento</Title>
        <GoogleButton toLogin={true} />
      </Stack>
    </Center>
  ) : (
    <Navigate to="/add-event" replace />
  );
};
