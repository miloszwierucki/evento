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
import AppShellLayout from "./pages/AppShellLayout";
import { Auth } from "./pages/Auth";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { AddEventPage } from "./pages/AddEventPage/AddEventPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { ViewEventsPage } from "./pages/ViewEventsPage/ViewEventsPage";
import { SettingsPage } from "./pages/SettingsPage/SettingsPage";
import { isAdmin } from "./config/supabase-client";

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
            element: <AddEventPage />,
          },
          {
            path: "/view-events",
            element: <ViewEventsPage />,
          },
          {
            path: isAdmin ? "/settings" : "/",
            element: <SettingsPage />,
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
