import { useEffect, useState } from "react";
import api from "../../services/api";

interface Policy {
  id: number;
  policyNumber: string;
  status: string;
  insuranceProduct: {
    name: string;
  };
}

interface Claim {
  id: number;
  claimNumber: string;
  claimAmount: number;
  description: string;
  filedDate: string;
  status: string;
  policy: {
    policyNumber: string;
  };
}

function Claims() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);

  const [selectedPolicy, setSelectedPolicy] = useState<number | null>(null);
  const [claimAmount, setClaimAmount] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [policiesResponse, claimsResponse] = await Promise.all([
        api.get("/policies"),
        api.get("/claims"),
      ]);

      setPolicies(policiesResponse.data);
      setClaims(claimsResponse.data);
    } catch (error) {
      console.error("Failed to load claims:", error);
      setError("Unable to load claims.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPolicy) {
      setError("Please select a policy.");
      return;
    }

    if (!claimAmount || Number(claimAmount) <= 0) {
      setError("Please enter a valid claim amount.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const response = await api.post(
        `/claims/policy/${selectedPolicy}`,
        {
          claimAmount: Number(claimAmount),
          description: description,
        }
      );

      console.log("Claim created:", response.data);

      setMessage(
        `Claim ${response.data.claimNumber} filed successfully.`
      );

      setClaimAmount("");
      setDescription("");
      setSelectedPolicy(null);

      await fetchData();
    } catch (error) {
      console.error("Failed to file claim:", error);
      setError("Unable to file claim.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <p className="text-slate-600">
          Loading claims...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <h1 className="text-xl font-bold text-slate-900">
            InsureCore
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            My Claims
          </h2>

          <p className="mt-2 text-slate-500">
            File and track your insurance claims.
          </p>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* File Claim */}
        <section className="rounded-xl bg-white p-6 shadow-sm">

          <h3 className="text-xl font-semibold text-slate-900">
            File a Claim
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Submit a claim for one of your active policies.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >

            {/* Policy */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Policy
              </label>

              <select
                value={selectedPolicy ?? ""}
                onChange={(e) =>
                  setSelectedPolicy(
                    e.target.value
                      ? Number(e.target.value)
                      : null
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                required
              >
                <option value="">
                  Select a policy
                </option>

                {policies
                  .filter((policy) => policy.status === "ACTIVE")
                  .map((policy) => (
                    <option
                      key={policy.id}
                      value={policy.id}
                    >
                      {policy.policyNumber} -{" "}
                      {policy.insuranceProduct.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Claim Amount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Claim Amount
              </label>

              <input
                type="number"
                min="1"
                value={claimAmount}
                onChange={(e) =>
                  setClaimAmount(e.target.value)
                }
                placeholder="150000"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Hospitalization due to medical treatment"
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Filing Claim..."
                : "File Claim"}
            </button>

          </form>

        </section>

        {/* Claims List */}
        <section className="mt-8">

          <h3 className="mb-4 text-xl font-semibold text-slate-900">
            Claim History
          </h3>

          {claims.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="text-slate-500">
                You don't have any claims yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">

              {claims.map((claim) => (
                <div
                  key={claim.id}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >

                  <div className="grid gap-6 md:grid-cols-5">

                    <div>
                      <p className="text-sm text-slate-500">
                        Claim Number
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        {claim.claimNumber}
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
                        Amount
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        ₹{claim.claimAmount.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Filed Date
                      </p>

                      <p className="mt-1 font-medium text-slate-900">
                        {claim.filedDate}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Status
                      </p>

                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
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

                  </div>

                  <div className="mt-5 border-t pt-4">
                    <p className="text-sm text-slate-500">
                      Description
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                      {claim.description}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default Claims;