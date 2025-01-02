export function BackgroundGrid() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
    </div>
  );
}