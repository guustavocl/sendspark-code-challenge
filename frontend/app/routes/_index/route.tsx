import type { MetaFunction } from "@remix-run/node";

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
    <div>
      <h1>Welcome to Remix</h1>
    </div>
  );
}
