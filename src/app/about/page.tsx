export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">About NextBank</h1>
      <p className="text-lg text-[var(--fg-secondary)] mb-8">
        NextBank was founded with a mission to make banking more accessible,
        secure, and convenient for everyone. Our cutting-edge technology and
        customer-first approach ensure that you have full control over your
        finances.
      </p>
      <div className="bg-[var(--bg-surface)] p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="text-[var(--fg-secondary)]">
          To redefine banking through innovation, transparency, and trust —
          empowering customers worldwide to achieve their financial goals.
        </p>
      </div>
    </main>
  );
}
