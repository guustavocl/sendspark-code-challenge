import { Button } from "@mui/material";
import { Link, useMatches } from "@remix-run/react";
import { Home } from "lucide-react";
import { useUserData } from "~/contexts/UserContext";
import { useSignOut } from "~/hooks/useSignOut";

export function Header() {
  const { loggedUser } = useUserData();
  const { handleSignOut } = useSignOut();
  const matches = useMatches();
  const currentRoute = matches[1];

  return (
    <header className="sticky top-0 z-10 h-[57px] min-h-[57px] border-b border-primary/70 bg-primary px-3">
      <div className="container h-full flex items-center justify-center gap-4">
        <Link to={"/"}>
          <Home className="size-5 fill-accent text-accent" />
        </Link>
        <h1 className="text-xl font-semibold">
          {(currentRoute?.handle as string) ?? ""}
        </h1>
        <div className="ml-auto flex flex-row items-center gap-4">
          {loggedUser ? (
            <Button
              variant="contained"
              className="bg-accent hover:bg-accent hover:brightness-75"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Link to={"/sign-in"}>
                <Button variant="text" className="text-accent">
                  Sign In
                </Button>
              </Link>
              <Link to={"/sign-up"}>
                <Button
                  variant="contained"
                  className="bg-accent hover:bg-accent hover:brightness-75"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
