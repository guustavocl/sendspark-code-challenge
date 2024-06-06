import { Button, Typography } from "@mui/material";
import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useUserData } from "~/contexts/UserContext";

export const meta: MetaFunction = () => {
  return [
    { title: "Sendspark - User Dashboard" },
    {
      name: "description",
      content: "Welcome to https://gus.sh code challenge",
    },
  ];
};

export const handle = "Dashboard";

export default function Index() {
  const { loggedUser } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) navigate("/");
  }, [loggedUser, navigate]);

  return (
    <>
      <Typography
        variant="h3"
        component="h3"
        className="text-accent font-semibold"
      >
        Welcome, {loggedUser?.firstName}
      </Typography>
      <Button onClick={() => navigate("/")}>Home</Button>
    </>
  );
}
