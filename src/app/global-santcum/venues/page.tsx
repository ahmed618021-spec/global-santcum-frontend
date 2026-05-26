export default function VenuesPage() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <iframe
        src="https://nextjs-webportal-tgs.vercel.app/venues"
        title="Explore venues"
        style={{ border: 0, width: "100%", minHeight: "100vh" }}
      />
    </main>
  );
}
