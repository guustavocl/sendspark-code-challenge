import type { MetaFunction } from "@remix-run/node";

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
    <div>
      <h1>Welcome to Remix</h1>
    </div>
  );
}
