import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-2">
      Hello "/about"!
      <Link to="/" className="font-semibold text-blue-500">
        Go to index
      </Link>
    </div>
  );
}
