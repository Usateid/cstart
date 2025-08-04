import { UserProvider } from "@/lib/contexts/user-context";
import Header from "./_components/header";
import { getUser } from "@/lib/db/queries";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = getUser();

  return (
    <UserProvider userPromise={user}>
      <section className="flex flex-col min-h-screen">
        <Header />
        {children}
      </section>
    </UserProvider>
  );
}
