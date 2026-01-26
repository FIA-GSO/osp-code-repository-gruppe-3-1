import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-2">
      Hello "/"!
      <Link to="/about" className="font-semibold text-blue-500">
        Go to about
      </Link>
    </div>
  );
}
