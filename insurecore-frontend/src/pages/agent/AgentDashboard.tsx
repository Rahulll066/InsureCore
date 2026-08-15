import { useNavigate } from "react-router-dom";

function AgentDashboard() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email") || "Agent";

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
              Agent Portal
            </p>
          </div>

          <div className="flex items-center gap-4">

            <span className="text-sm text-slate-600">
              {email}
            </span>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              AGENT
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
            Agent Dashboard
          </h2>

          <p className="mt-1 text-slate-500">
            Manage customer quotes, policies and claims.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending Quotes
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              1
            </p>
          </div>

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
              Pending Claims
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              1
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Settled Claims
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              0
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <section className="mt-8">

          <h3 className="mb-4 text-xl font-semibold text-slate-900">
            Agent Actions
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <button
              onClick={() => navigate("/agent/claims")}
              className="rounded-xl bg-blue-600 p-6 text-left text-white transition hover:bg-blue-700"
            >
              <p className="text-lg font-semibold">
                Manage Claims
              </p>

              <p className="mt-2 text-sm text-blue-100">
                Review, approve, reject and settle customer claims.
              </p>
            </button>

            <button
              onClick={() => navigate("/agent/quotes")}
              className="rounded-xl bg-white p-6 text-left shadow-sm transition hover:shadow-md"
            >
              <p className="text-lg font-semibold text-slate-900">
                Manage Quotes
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Review customer insurance quotes.
              </p>
            </button>

            <button
              onClick={() => navigate("/agent/policies")}
              className="rounded-xl bg-white p-6 text-left shadow-sm transition hover:shadow-md"
            >
              <p className="text-lg font-semibold text-slate-900">
                View Policies
              </p>

              <p className="mt-2 text-sm text-slate-500">
                View active customer policies.
              </p>
            </button>

          </div>

        </section>

        {/* Today's Work */}
        <section className="mt-8">

          <h3 className="mb-4 text-xl font-semibold text-slate-900">
            Today's Work
          </h3>

          <div className="rounded-xl bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="font-semibold text-slate-900">
                  Claims requiring review
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Review recently filed customer claims.
                </p>
              </div>

              <button
                onClick={() => navigate("/agent/claims")}
                className="rounded-lg border border-blue-600 px-5 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50"
              >
                Review Claims
              </button>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default AgentDashboard;