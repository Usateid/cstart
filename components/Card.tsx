export default function Card({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-2xl font-semibold text-gray-900 mb-2 border-b p-5">
        {title}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
