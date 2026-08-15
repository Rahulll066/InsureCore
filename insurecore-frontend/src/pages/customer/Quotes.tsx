import { useEffect, useState } from "react";
import api from "../../services/api";

interface Quote {
  id: number;
  premium: number;
  status: string;
  createdAt: string;
  validUntil: string;
  insuranceProduct: {
    name: string;
    type: string;
  };
}

function Quotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchQuotes = async () => {
    try {
      const response = await api.get("/quotes");
      setQuotes(response.data);
    } catch (error) {
      console.error("Failed to load quotes:", error);
      setMessage("Unable to load quotes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleAccept = async (id: number) => {
    try {
      await api.put(`/quotes/${id}/accept`);

      setMessage("Quote accepted successfully.");

      await fetchQuotes();
    } catch (error) {
      console.error("Failed to accept quote:", error);
      setMessage("Unable to accept quote.");
    }
  };

  const handleIssuePolicy = async (quoteId: number) => {
  try {
    const response = await api.post(`/policies/issue/${quoteId}`);

    console.log("Policy created:", response.data);

    setMessage(
      `Policy ${response.data.policyNumber} issued successfully.`
    );
  } catch (error) {
    console.error("Failed to issue policy:", error);
    setMessage("Unable to issue policy.");
  }
  };

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
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            My Quotes
          </h2>

          <p className="mt-2 text-slate-500">
            View and manage your insurance quotes.
          </p>
        </div>

        {message && (
          <div className="mb-6 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
            {message}
          </div>
        )}

        {quotes.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-slate-500">
              You don't have any quotes yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-6 md:flex-row">

                  <div>
                    <p className="text-sm text-slate-500">
                      Quote #{quote.id}
                    </p>

                    <h3 className="mt-1 text-xl font-semibold text-slate-900">
                      {quote.insuranceProduct.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {quote.insuranceProduct.type}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Premium
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      ₹{quote.premium.toLocaleString("en-IN")}
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

                  <div>
                    <p className="text-sm text-slate-500">
                      Status
                    </p>

                    <span
                      className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
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

                </div>

                {quote.status === "PENDING" && (
                  <div className="mt-6 border-t pt-5">
                    <button
                      onClick={() => handleAccept(quote.id)}
                      className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
                    >
                      Accept Quote
                    </button>
                  </div>
                )}

                {quote.status === "ACCEPTED" && (
                    <div className="mt-6 border-t pt-5">
                        <button
                        onClick={() => handleIssuePolicy(quote.id)}
                        className="rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700"
                        >
                        Issue Policy
                        </button>
                    </div>
                )}

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default Quotes;