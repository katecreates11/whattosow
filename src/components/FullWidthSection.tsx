export default function FullWidthSection({
  children,
  className = "",
  innerClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={`relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${className}`}
    >
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
