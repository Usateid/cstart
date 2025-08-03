import { getSession } from "@/lib/auth/session";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <div>
      <span>{session?.user.id}</span>
      {children}
    </div>
  );
}
