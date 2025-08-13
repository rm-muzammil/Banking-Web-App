export default function ServicesPage() {
  return (
    <main className="min-h-screen py-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Services</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[var(--bg-surface)] p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">Savings Accounts</h3>
          <p className="text-[var(--fg-secondary)]">
            High-interest savings accounts designed to grow your wealth.
          </p>
        </div>
        <div className="bg-[var(--bg-surface)] p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">Loans & Credit</h3>
          <p className="text-[var(--fg-secondary)]">
            Flexible loan options for personal, business, and home needs.
          </p>
        </div>
        <div className="bg-[var(--bg-surface)] p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">Investment Plans</h3>
          <p className="text-[var(--fg-secondary)]">
            Expert-guided investment portfolios to help you achieve your goals.
          </p>
        </div>
      </div>
    </main>
  );
}
