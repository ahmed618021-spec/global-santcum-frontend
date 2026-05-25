type FrozenPageFrameProps = {
  src: string;
  title: string;
};

export default function FrozenPageFrame({ src, title }: FrozenPageFrameProps) {
  return (
    <main className="h-screen w-screen bg-white">
      <iframe src={src} title={title} className="h-full w-full border-0" />
    </main>
  );
}
