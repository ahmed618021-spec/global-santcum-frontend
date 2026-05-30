"use client";

type FrozenPageFrameProps = {
  src: string;
  title?: string;
};

export default function FrozenPageFrame({
  src,
  title = "Frozen page",
}: FrozenPageFrameProps) {
  const hash =
    typeof window !== "undefined" && !src.includes("#")
      ? window.location.hash
      : "";
  const frameSrc = hash ? `${src}${hash}` : src;

  return (
    <main style={{ minHeight: "100vh" }}>
      <iframe
        src={frameSrc}
        title={title}
        suppressHydrationWarning
        style={{ border: 0, width: "100%", minHeight: "100vh" }}
      />
    </main>
  );
}
