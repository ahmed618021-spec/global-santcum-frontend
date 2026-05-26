type FrozenPageFrameProps = {
  src: string;
  title?: string;
};

export default function FrozenPageFrame({
  src,
  title = "Frozen page",
}: FrozenPageFrameProps) {
  return (
    <main style={{ minHeight: "100vh" }}>
      <iframe
        src={src}
        title={title}
        style={{ border: 0, width: "100%", minHeight: "100vh" }}
      />
    </main>
  );
}