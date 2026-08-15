import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email") || "Admin";

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
              Administration Portal
            </p>
          </div>

          <div className="flex items-center gap-4">

            <span className="text-sm text-slate-600">
              {email}
            </span>

            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
              ADMIN
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
            Admin Dashboard
          </h2>

          <p className="mt-1 text-slate-500">
            Manage the InsureCore insurance platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Customers
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              1
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Agents
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              1
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Policies
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              1
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Claims
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              1
            </p>
          </div>

        </div>

        {/* Administration */}
        <section className="mt-8">

          <h3 className="mb-4 text-xl font-semibold text-slate-900">
            Administration
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <button
              onClick={() => navigate("/admin/products")}
              className="rounded-xl bg-blue-600 p-6 text-left text-white transition hover:bg-blue-700"
            >
              <p className="text-lg font-semibold">
                Insurance Products
              </p>

              <p className="mt-2 text-sm text-blue-100">
                Create and manage insurance products.
              </p>
            </button>

            <button
              onClick={() => navigate("/admin/users")}
              className="rounded-xl bg-white p-6 text-left shadow-sm transition hover:shadow-md"
            >
              <p className="text-lg font-semibold text-slate-900">
                User Management
              </p>

              <p className="mt-2 text-sm text-slate-500">
                View customers and agents.
              </p>
            </button>

            <button
              onClick={() => navigate("/admin/policies")}
              className="rounded-xl bg-white p-6 text-left shadow-sm transition hover:shadow-md"
            >
              <p className="text-lg font-semibold text-slate-900">
                Policies
              </p>

              <p className="mt-2 text-sm text-slate-500">
                View and manage insurance policies.
              </p>
            </button>

            <button
              onClick={() => navigate("/admin/claims")}
              className="rounded-xl bg-white p-6 text-left shadow-sm transition hover:shadow-md"
            >
              <p className="text-lg font-semibold text-slate-900">
                Claims
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Monitor insurance claims.
              </p>
            </button>

            <button
              onClick={() => navigate("/admin/payments")}
              className="rounded-xl bg-white p-6 text-left shadow-sm transition hover:shadow-md"
            >
              <p className="text-lg font-semibold text-slate-900">
                Payments
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Monitor customer payments.
              </p>
            </button>

          </div>

        </section>

        {/* System Overview */}
        <section className="mt-8">

          <h3 className="mb-4 text-xl font-semibold text-slate-900">
            System Overview
          </h3>

          <div className="rounded-xl bg-white p-6 shadow-sm">

            <div className="grid gap-6 md:grid-cols-3">

              <div>
                <p className="text-sm text-slate-500">
                  Insurance Products
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  Manage available plans
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Customers & Agents
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  Manage system users
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Operations
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  Monitor policies, claims and payments
                </p>
              </div>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;