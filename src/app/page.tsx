import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="fixed left-3 bottom-3 z-50">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
