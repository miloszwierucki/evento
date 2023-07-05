import { Center, Stack, Title, Text } from "@mantine/core";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Center sx={{ width: "100%", height: "100vh" }}>
      <Stack align="center" spacing="xs">
        <Title size={40}>Oops!</Title>
        Sorry, an unexpected error has occurred.
        <Text>
          <i>{error.statusText || error.message}</i>
        </Text>
      </Stack>
    </Center>
  );
}
