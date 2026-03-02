import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/notFound')({
  component: Unknown,
})

export default function Unknown() {
  return (
            <div style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                fontFamily: "Arial"
                }}>
            <h1>Access Denied</h1>
            <p>You do not have permission to access this page.</p>
            </div>
  );
}
