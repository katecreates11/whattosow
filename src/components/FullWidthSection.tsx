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
      className={`${className}`}
    >
      <div className={`max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
