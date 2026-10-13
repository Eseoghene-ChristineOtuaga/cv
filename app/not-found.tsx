import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="container">
        <div className="soot-sprite lost-sprite" aria-hidden="true" />
        <h1 className="section-title">Lost in the Forest</h1>
        <p>This path doesn&apos;t lead anywhere. Even the soot sprites can&apos;t find it.</p>
        <Link href="/" className="btn">
          Back Home
        </Link>
      </div>
    </section>
  );
}
