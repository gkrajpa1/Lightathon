export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[50px] h-[50px]">
        {[...Array(10)].map((_, i) => (
          <i
            key={i}
            className="absolute block w-[50px] h-[50px] rounded-full opacity-0 animate-scale"
            style={{
              animationDelay: `${(i + 1) * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
