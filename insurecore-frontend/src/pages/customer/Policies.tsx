import { useEffect, useState } from "react";
import api from "../../services/api";

interface Policy {
  id: number;
  policyNumber: string;
  premium: number;
  startDate: string;
  endDate: string;
  status: string;
  insuranceProduct: {
    name: string;
    type: string;
    coverageAmount: number;
  };
}

function Policies() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await api.get("/policies");
        setPolicies(response.data);
      } catch (error) {
        console.error("Failed to load policies:", error);
        setError("Unable to load policies.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const handlePayment = async (policyId: number) => {
    setPaymentLoading(policyId);
    setMessage("");
    setError("");

    try {
      const response = await api.post(
        `/payments/policy/${policyId}`
      );

      console.log("Payment successful:", response.data);

      setMessage(
        `Payment successful! Transaction ID: ${response.data.transactionId}`
      );
    } catch (error) {
      console.error("Payment failed:", error);
      setError("Payment failed.");
    } finally {
      setPaymentLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <p className="text-slate-600">
          Loading policies...
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

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            My Policies
          </h2>

          <p className="mt-2 text-slate-500">
            View and manage your insurance policies.
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* No Policies */}
        {!error && policies.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-slate-500">
              You don't have any policies yet.
            </p>
          </div>
        )}

        {/* Policies */}
        <div className="space-y-5">

          {policies.map((policy) => (
            <div
              key={policy.id}
              className="rounded-xl bg-white p-6 shadow-sm"
            >

              <div className="flex flex-col gap-6">

                {/* Policy Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row">

                  <div>
                    <p className="text-sm text-slate-500">
                      Policy Number
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      {policy.policyNumber}
                    </h3>
                  </div>

                  <span
                    className={`self-start rounded-full px-3 py-1 text-sm font-medium ${
                      policy.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : policy.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {policy.status}
                  </span>

                </div>

                {/* Policy Details */}
                <div className="grid gap-5 border-t pt-5 sm:grid-cols-2 lg:grid-cols-4">

                  <div>
                    <p className="text-sm text-slate-500">
                      Insurance
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {policy.insuranceProduct.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Coverage
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      ₹
                      {policy.insuranceProduct.coverageAmount.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Premium
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      ₹{policy.premium.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Type
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {policy.insuranceProduct.type}
                    </p>
                  </div>

                </div>

                {/* Dates */}
                <div className="grid gap-5 border-t pt-5 sm:grid-cols-2">

                  <div>
                    <p className="text-sm text-slate-500">
                      Start Date
                    </p>

                    <p className="mt-1 font-medium text-slate-900">
                      {policy.startDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      End Date
                    </p>

                    <p className="mt-1 font-medium text-slate-900">
                      {policy.endDate}
                    </p>
                  </div>

                </div>

                {/* Payment */}
                {policy.status === "ACTIVE" && (
                  <div className="border-t pt-5">

                    <button
                      onClick={() => handlePayment(policy.id)}
                      disabled={paymentLoading === policy.id}
                      className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {paymentLoading === policy.id
                        ? "Processing..."
                        : "Pay Premium"}
                    </button>

                  </div>
                )}

              </div>

            </div>
          ))}

        </div>

      </main>
    </div>
  );
}

export default Policies;