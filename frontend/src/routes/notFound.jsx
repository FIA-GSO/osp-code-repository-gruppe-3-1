import { createFileRoute } from '@tanstack/react-router';
import Error404 from '../assets/Error404.png';

export const Route = createFileRoute('/notFound')({
  component: Unknown,
});

export default function Unknown() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: 'Arial',
      }}
    >
      <div
        style={{
          backgroundImage: `url(${Error404})`,
          width: '400px',
          height: '300px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
    </div>
  );
}