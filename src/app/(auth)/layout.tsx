export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-gray-500 h-screen flex justify-center items-center">
      <div className="bg-amber-50 md:min-w-[25rem] md:min-h-[25rem] flex flex-col text-gray-600">
        {children}
      </div>
    </div>
  );
}
