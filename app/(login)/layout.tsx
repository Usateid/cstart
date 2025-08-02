export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 lg:px-8">
      {children}
    </div>
  );
}
