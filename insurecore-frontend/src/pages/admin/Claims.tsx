import { useEffect, useState } from "react";
import api from "../../services/api";

interface Claim {
  id: number;
  claimNumber: string;
  claimAmount: number;
  description: string;
  filedDate: string;
  status: string;
  policy: {
    policyNumber: string;
    customer: {
      firstName: string;
      lastName: string;
      email: string;
    };
    insuranceProduct: {
      name: string;
    };
  };
}

function AdminClaims() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await api.get("/claims");
        setClaims(response.data);
      } catch (error) {
        console.error("Failed to load claims:", error);
        setError("Unable to load claims.");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <p className="text-slate-600">Loading claims...</p>
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
            Administration Portal
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Claims Management
          </h2>

          <p className="mt-2 text-slate-500">
            Monitor all customer insurance claims.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {claims.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-slate-500">
              No claims found.
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {claims.map((claim) => (
              <div
                key={claim.id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >

                <div className="flex flex-col justify-between gap-4 md:flex-row">

                  <div>
                    <p className="text-sm text-slate-500">
                      Claim Number
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      {claim.claimNumber}
                    </h3>
                  </div>

                  <span
                    className={`self-start rounded-full px-3 py-1 text-sm font-medium ${
                      claim.status === "FILED"
                        ? "bg-yellow-100 text-yellow-700"
                        : claim.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : claim.status === "SETTLED"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {claim.status}
                  </span>

                </div>

                <div className="mt-6 grid gap-5 border-t pt-5 md:grid-cols-4">

                  <div>
                    <p className="text-sm text-slate-500">
                      Customer
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {claim.policy.customer.firstName}{" "}
                      {claim.policy.customer.lastName}
                    </p>

                    <p className="text-sm text-slate-500">
                      {claim.policy.customer.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Policy
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {claim.policy.policyNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Insurance
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {claim.policy.insuranceProduct.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Claim Amount
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      ₹{claim.claimAmount.toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>

                <div className="mt-5 border-t pt-5">

                  <p className="text-sm text-slate-500">
                    Description
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {claim.description}
                  </p>

                  <p className="mt-3 text-xs text-slate-400">
                    Filed on {claim.filedDate}
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

export default AdminClaims;