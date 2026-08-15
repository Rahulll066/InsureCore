import { useEffect, useState } from "react";
import api from "../../services/api";

interface Quote {
  id: number;
  premium: number;
  status: string;
  createdAt: string;
  validUntil: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  insuranceProduct: {
    name: string;
    type: string;
    coverageAmount: number;
  };
}

function AgentQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await api.get("/quotes");
        setQuotes(response.data);
      } catch (error) {
        console.error("Failed to load quotes:", error);
        setError("Unable to load quotes.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <p className="text-slate-600">Loading quotes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <h1 className="text-xl font-bold text-slate-900">
            InsureCore
          </h1>

          <p className="text-xs text-slate-500">
            Agent Portal
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Quote Management
          </h2>

          <p className="mt-2 text-slate-500">
            View customer insurance quotes.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {quotes.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-slate-500">
              No quotes found.
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >

                <div className="flex flex-col justify-between gap-4 md:flex-row">

                  <div>
                    <p className="text-sm text-slate-500">
                      Quote #{quote.id}
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      {quote.insuranceProduct.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {quote.insuranceProduct.type}
                    </p>
                  </div>

                  <span
                    className={`self-start rounded-full px-3 py-1 text-sm font-medium ${
                      quote.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : quote.status === "ACCEPTED"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {quote.status}
                  </span>

                </div>

                <div className="mt-6 grid gap-5 border-t pt-5 md:grid-cols-4">

                  <div>
                    <p className="text-sm text-slate-500">
                      Customer
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {quote.customer.firstName}{" "}
                      {quote.customer.lastName}
                    </p>

                    <p className="text-sm text-slate-500">
                      {quote.customer.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Premium
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      ₹{quote.premium.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Coverage
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      ₹
                      {quote.insuranceProduct.coverageAmount.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Valid Until
                    </p>

                    <p className="mt-1 font-medium text-slate-900">
                      {quote.validUntil}
                    </p>
                  </div>

                </div>

                <div className="mt-5 border-t pt-5">

                  <p className="text-xs text-slate-400">
                    Created:{" "}
                    {new Date(quote.createdAt).toLocaleString("en-IN")}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default AgentQuotes;