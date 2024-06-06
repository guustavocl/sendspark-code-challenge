import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import stylesheet from "./tailwind.css?url";
import { Header } from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material";
import { UserProvider } from "./contexts/UserContext";
import { UserProps } from "./types/User";
import { Toaster } from "react-hot-toast";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7747D8",
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      contrastText: "#47008F",
    },
  },
});

export function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  let userData;

  if (cookieHeader) {
    const cookies = cookieHeader.split("; ");
    const userCookieValue = cookies
      .find((cookie) => cookie.startsWith("user_cookie="))
      ?.split("=")[1];
    if (userCookieValue) {
      userData = JSON.parse(decodeURIComponent(userCookieValue));
    }
  }

  return json({
    ENV: {
      POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
    },
    USER_DATA: userData,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { USER_DATA } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={darkTheme}>
          <UserProvider cookieUser={USER_DATA as UserProps | undefined}>
            <div className="relative flex flex-col min-h-[100dvh] md:min-h-screen">
              <Header />
              <main className="flex flex-col flex-1 w-full container py-20 items-center gap-4">
                {children}
              </main>
            </div>
            <Toaster />
          </UserProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
