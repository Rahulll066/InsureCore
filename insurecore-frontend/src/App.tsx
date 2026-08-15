import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login/Login";

import CustomerDashboard from "./pages/customer/CustomerDashboard";
import Products from "./pages/customer/Products";
import Quotes from "./pages/customer/Quotes";
import Policies from "./pages/customer/Policies";
import Payments from "./pages/customer/Payments";
import Claims from "./pages/customer/Claims";

import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentClaims from "./pages/agent/Claims";
import AgentQuotes from "./pages/agent/Quotes";
import AgentPolicies from "./pages/agent/Policies";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/Products";
import AdminPolicies from "./pages/admin/Policies";
import AdminClaims from "./pages/admin/Claims";
import AdminPayments from "./pages/admin/Payments";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================== PUBLIC ==================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ==================== CUSTOMER ==================== */}

        <Route
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]} />
          }
        >
          <Route
            path="/customer/dashboard"
            element={<CustomerDashboard />}
          />

          <Route
            path="/customer/products"
            element={<Products />}
          />

          <Route
            path="/customer/quotes"
            element={<Quotes />}
          />

          <Route
            path="/customer/policies"
            element={<Policies />}
          />

          <Route
            path="/customer/payments"
            element={<Payments />}
          />

          <Route
            path="/customer/claims"
            element={<Claims />}
          />
        </Route>


        {/* ==================== AGENT ==================== */}

        <Route
          element={
            <ProtectedRoute allowedRoles={["AGENT"]} />
          }
        >
          <Route
            path="/agent/dashboard"
            element={<AgentDashboard />}
          />

          <Route
            path="/agent/claims"
            element={<AgentClaims />}
          />

          <Route
            path="/agent/quotes"
            element={<AgentQuotes />}
          />

          <Route
            path="/agent/policies"
            element={<AgentPolicies />}
          />
        </Route>


        {/* ==================== ADMIN ==================== */}

        <Route
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]} />
          }
        >
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/products"
            element={<AdminProducts />}
          />

          <Route
            path="/admin/policies"
            element={<AdminPolicies />}
          />

          <Route
            path="/admin/claims"
            element={<AdminClaims />}
          />

          <Route
            path="/admin/payments"
            element={<AdminPayments />}
          />
        </Route>


        {/* ==================== UNKNOWN ROUTES ==================== */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;