import { Typography } from "@mui/material";
import type { MetaFunction } from "@remix-run/node";
import SignInForm from "./ui/SignInForm";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Sendspark - Sign In" },
    {
      name: "description",
      content: "Welcome to https://gus.sh code challenge",
    },
  ];
};

export const handle = "Sign In";

export default function Index() {
  return (
    <>
      <Typography
        variant="h3"
        component="h3"
        className="text-accent font-semibold"
      >
        Sign In
      </Typography>
      <Typography variant="h6" component="h6" className="font-thin">
        Please insert a valid email and password
      </Typography>
      <Typography variant="body1" component="div" className="font-thin">
        Don&apos;t have an account yet?{" "}
        <Link to={"/sign-up"} className="text-accent hover:brightness-75">
          Sign up
        </Link>
      </Typography>
      <SignInForm className="mt-14 grid grid-cols-2 gap-4 w-full sm:w-3/4 md:w-3/5 lg:w-2/5" />
    </>
  );
}
