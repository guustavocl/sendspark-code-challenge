import type { MetaFunction } from "@remix-run/node";
import SignUpForm from "./ui/SignUpForm";
import { Typography } from "@mui/material";

export const meta: MetaFunction = () => {
  return [
    { title: "Sendspark - Sign Up" },
    {
      name: "description",
      content: "Welcome to https://gus.sh code challenge",
    },
  ];
};

export const handle = "Sign Up";

export default function Index() {
  return (
    <>
      <Typography
        variant="h3"
        component="h3"
        className="text-accent font-semibold"
      >
        Nice to meet you!
      </Typography>
      <Typography variant="h6" component="h6" className="font-thin">
        We&apos;re excited to have you aboard!
      </Typography>
      <SignUpForm className="mt-14 grid grid-cols-2 gap-4 w-full sm:w-3/4 md:w-4/5 lg:w-2/4" />
    </>
  );
}
