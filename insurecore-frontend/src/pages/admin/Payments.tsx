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

function AdminPayments() {
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

          <p className="text-xs text-slate-500">
            Administration Portal
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Payment Management
          </h2>

          <p className="mt-2 text-slate-500">
            Monitor all customer insurance payments.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {payments.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-slate-500">
              No payments found.
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {payments.map((payment) => (
              <div
                key={payment.id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >

                <div className="flex flex-col justify-between gap-4 md:flex-row">

                  <div>
                    <p className="text-sm text-slate-500">
                      Transaction ID
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      {payment.transactionId}
                    </h3>
                  </div>

                  <span
                    className={`self-start rounded-full px-3 py-1 text-sm font-medium ${
                      payment.status === "SUCCESS"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.status}
                  </span>

                </div>

                <div className="mt-6 grid gap-5 border-t pt-5 md:grid-cols-4">

                  <div>
                    <p className="text-sm text-slate-500">
                      Customer
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {payment.policy.customer.firstName}{" "}
                      {payment.policy.customer.lastName}
                    </p>

                    <p className="text-sm text-slate-500">
                      {payment.policy.customer.email}
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

                    <p className="mt-1 font-semibold text-slate-900">
                      {payment.policy.insuranceProduct.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Amount
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      ₹{payment.amount.toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>

                <div className="mt-5 border-t pt-5">

                  <p className="text-sm text-slate-500">
                    Payment Date
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {new Date(payment.paymentDate).toLocaleString("en-IN")}
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

export default AdminPayments;