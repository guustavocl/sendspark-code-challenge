import { Typography } from "@mui/material";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Sendspark code challenge" },
    {
      name: "description",
      content: "Welcome to https://gus.sh code challenge",
    },
  ];
};

export const handle = "Sendspark";

export default function Index() {
  return (
    <>
      <Typography variant="h2" component="h2" className="font-bold">
        Welcome to my Sendspark code challenge
      </Typography>
      <Typography variant="h4" component="h2">
        There are 3 other routes besides the homepage.{" "}
      </Typography>
      <ul className="flex flex-col gap-1 list-decimal text-lg">
        <li>
          <Link className="text-accent hover:brightness-75" to={"/sign-up"}>
            Sign Up
          </Link>
        </li>
        <li>
          <Link className="text-accent hover:brightness-75" to={"/sign-in"}>
            Sign In
          </Link>
        </li>
        <li>
          <Link className="text-accent hover:brightness-75" to={"/dashboard"}>
            Dashboard
          </Link>{" "}
          <span className="text-xs opacity-70">
            (this should be protected, you can only access if signed in!)
          </span>
        </li>
      </ul>
    </>
  );
}