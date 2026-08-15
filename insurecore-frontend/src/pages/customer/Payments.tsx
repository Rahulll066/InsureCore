import { useEffect, useState } from "react";
import api from "../../services/api";

interface Payment {
  id: number;
  amount: number;
  paymentDate: string;
  status: string;
  transactionId: string;
  policy: {
    policyNumber: string;
    insuranceProduct: {
      name: string;
    };
  };
}

function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get("/payments");
        setPayments(response.data);
      } catch (error) {
        console.error("Failed to load payments:", error);
        setError("Unable to load payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <p className="text-slate-600">Loading payments...</p>
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
            My Payments
          </h2>

          <p className="mt-2 text-slate-500">
            View your insurance payment history.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {!error && payments.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-slate-500">
              No payments found.
            </p>
          </div>
        )}

        <div className="space-y-4">

          {payments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="grid gap-6 md:grid-cols-5">

                <div>
                  <p className="text-sm text-slate-500">
                    Transaction ID
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {payment.transactionId}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Policy
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {payment.policy.policyNumber}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Insurance
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {payment.policy.insuranceProduct.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Amount
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    ₹{payment.amount.toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                      payment.status === "SUCCESS"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.status}
                  </span>

                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(payment.paymentDate).toLocaleString("en-IN")}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>

      </main>
    </div>
  );
}

export default Payments;