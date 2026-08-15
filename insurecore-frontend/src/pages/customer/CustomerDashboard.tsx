import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email") || "Customer";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              InsureCore
            </h1>

            <p className="text-xs text-slate-500">
              Insurance Management System
            </p>
          </div>

          <div className="flex items-center gap-4">

            <span className="text-sm text-slate-600">
              {email}
            </span>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Logout
            </button>

          </div>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Welcome back
          </h2>

          <p className="mt-1 text-slate-500">
            Manage your insurance, policies, claims and payments.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Active Policies
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              1
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Quotes
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              3
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Claims
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              0
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Payments
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              1
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <section className="mt-8">

          <h3 className="mb-4 text-xl font-semibold text-slate-900">
            Quick Actions
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Products */}
            <button
              onClick={() => navigate("/customer/products")}
              className="rounded-xl bg-blue-600 p-5 text-left text-white transition hover:bg-blue-700"
            >
              <p className="font-semibold">
                Browse Insurance
              </p>

              <p className="mt-1 text-sm text-blue-100">
                Explore available insurance products
              </p>
            </button>

            {/* Quotes */}
            <button
              onClick={() => navigate("/customer/quotes")}
              className="rounded-xl bg-white p-5 text-left shadow-sm transition hover:shadow-md"
            >
              <p className="font-semibold text-slate-900">
                My Quotes
              </p>

              <p className="mt-1 text-sm text-slate-500">
                View and manage your quotes
              </p>
            </button>

            {/* Policies */}
            <button
              onClick={() => navigate("/customer/policies")}
              className="rounded-xl bg-white p-5 text-left shadow-sm transition hover:shadow-md"
            >
              <p className="font-semibold text-slate-900">
                My Policies
              </p>

              <p className="mt-1 text-sm text-slate-500">
                View your active policies
              </p>
            </button>

            {/* Payments */}
            <button
              onClick={() => navigate("/customer/payments")}
              className="rounded-xl bg-white p-5 text-left shadow-sm transition hover:shadow-md"
            >
              <p className="font-semibold text-slate-900">
                My Payments
              </p>

              <p className="mt-1 text-sm text-slate-500">
                View your payment history
              </p>
            </button>

          </div>

        </section>

        {/* Claims */}
        <section className="mt-8">

          <h3 className="mb-4 text-xl font-semibold text-slate-900">
            Claims
          </h3>

          <button
            onClick={() => navigate("/customer/claims")}
            className="w-full rounded-xl bg-white p-6 text-left shadow-sm transition hover:shadow-md"
          >
            <p className="font-semibold text-slate-900">
              My Claims
            </p>

            <p className="mt-1 text-sm text-slate-500">
              File and track your insurance claims.
            </p>
          </button>

        </section>

        {/* Current Policy */}
        <section className="mt-8">

          <div className="mb-4 flex items-center justify-between">

            <h3 className="text-xl font-semibold text-slate-900">
              Current Policy
            </h3>

            <button
              onClick={() => navigate("/customer/policies")}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all
            </button>

          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">

            <div className="flex flex-col justify-between gap-6 md:flex-row">

              <div>
                <p className="text-sm text-slate-500">
                  Policy Number
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  POL-AFBEC807
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Insurance
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  Comprehensive Health Insurance
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Premium
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  ₹25,000
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Status
                </p>

                <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  ACTIVE
                </span>
              </div>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default CustomerDashboard;