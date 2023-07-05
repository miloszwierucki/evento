import { useSessionContext } from "@supabase/auth-helpers-react";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import i18n from "./locales/i18n";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AddEvent } from "./pages/AddEvent/AddEvent";
import AppShellLayout from "./pages/AppShellLayout";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { Auth } from "./pages/Auth";
import { ViewEventsPage } from "./pages/ViewEventsPage/ViewEventsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShellLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Auth />,
        children: [
          {
            path: "/",
            element: <Navigate to="/add-event" replace />,
          },
          {
            path: "/add-event",
            element: <AddEvent />,
          },
          {
            path: "/view-events",
            element: <ViewEventsPage />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  const { isLoading } = useSessionContext();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);

  if (isLoading) {
    return <></>;
  }

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          loader: "dots",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications />
        <RouterProvider router={router} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
