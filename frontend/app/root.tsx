import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import stylesheet from "./tailwind.css?url";
import { Header } from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material";

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

export function Layout({ children }: { children: React.ReactNode }) {
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
          <div className="relative flex flex-col min-h-[100dvh] md:min-h-screen">
            <Header />
            <main className="flex flex-col flex-1 w-full container py-20 items-center gap-4">
              {children}
            </main>
          </div>
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
