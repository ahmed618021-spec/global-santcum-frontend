import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f2ec] p-6 text-[#2f2f2f]">
      <main className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-5xl place-items-center">
        <section className="w-full border border-[#ddd4c6] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:p-10">
          <h1 className="mb-2 text-4xl font-medium tracking-[0.01em]">The Global Sanctum</h1>
          <p className="mb-6 max-w-3xl text-[15px] leading-7 text-[#6f6a62]">
            Unified migration entry. Choose Website or Portal to navigate to the target platform routes.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/web"
              className="block border border-[#ddd4c6] bg-white p-5 transition duration-150 hover:-translate-y-0.5 hover:border-[#bcae95] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            >
              <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-[#8c7f67]">Public Site</p>
              <h2 className="mb-1 text-3xl">Website</h2>
              <p className="text-sm leading-6 text-[#6f6a62]">Public-facing web platform entry point.</p>
            </Link>

            <Link
              href="/portal"
              className="block border border-[#ddd4c6] bg-white p-5 transition duration-150 hover:-translate-y-0.5 hover:border-[#bcae95] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            >
              <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-[#8c7f67]">Internal App</p>
              <h2 className="mb-1 text-3xl">Portal</h2>
              <p className="text-sm leading-6 text-[#6f6a62]">Internal operations platform entry point.</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
