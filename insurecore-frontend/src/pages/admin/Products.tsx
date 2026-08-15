import {useEffect, useState } from "react";
import api from "../../services/api";

interface Product {
  id: number;
  name: string;
  type: string;
  description: string;
  coverageAmount: number;
  basePremium: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("HEALTH");
  const [description, setDescription] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [basePremium, setBasePremium] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to load products:", error);
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

   const handleCreateProduct = async (
   e: React.FormEvent<HTMLFormElement>
    ) => {
    e.preventDefault();

    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post("/products", {
        name,
        type,
        description,
        coverageAmount: Number(coverageAmount),
        basePremium: Number(basePremium),
      });

      console.log("Product created:", response.data);

      setMessage("Insurance product created successfully.");

      setName("");
      setType("HEALTH");
      setDescription("");
      setCoverageAmount("");
      setBasePremium("");

      await fetchProducts();
    } catch (error) {
      console.error("Failed to create product:", error);
      setError("Unable to create product.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);

      setMessage("Product deleted successfully.");

      await fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Unable to delete product.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <p className="text-slate-600">Loading products...</p>
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

          <p className="text-xs text-slate-500">
            Administration Portal
          </p>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Insurance Products
          </h2>

          <p className="mt-2 text-slate-500">
            Create and manage insurance products.
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

        {/* Create Product */}
        <section className="rounded-xl bg-white p-6 shadow-sm">

          <h3 className="text-xl font-semibold text-slate-900">
            Create Insurance Product
          </h3>

          <form
            onSubmit={handleCreateProduct}
            className="mt-6 space-y-5"
          >

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Comprehensive Health Insurance"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="HEALTH">HEALTH</option>
                <option value="LIFE">LIFE</option>
                <option value="AUTO">AUTO</option>
                <option value="HOME">HOME</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Comprehensive medical insurance coverage"
                rows={3}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Amounts */}
            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Coverage Amount
                </label>

                <input
                  type="number"
                  min="1"
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(e.target.value)}
                  placeholder="1000000"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Base Premium
                </label>

                <input
                  type="number"
                  min="1"
                  value={basePremium}
                  onChange={(e) => setBasePremium(e.target.value)}
                  placeholder="25000"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create Product"}
            </button>

          </form>

        </section>

        {/* Existing Products */}
        <section className="mt-8">

          <h3 className="mb-4 text-xl font-semibold text-slate-900">
            Existing Products
          </h3>

          <div className="space-y-4">

            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >

                <div className="flex flex-col justify-between gap-5 md:flex-row">

                  <div>
                    <div className="flex items-center gap-3">

                      <h4 className="text-lg font-bold text-slate-900">
                        {product.name}
                      </h4>

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        {product.type}
                      </span>

                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      {product.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="self-start rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>

                </div>

                <div className="mt-5 grid gap-5 border-t pt-5 sm:grid-cols-2">

                  <div>
                    <p className="text-sm text-slate-500">
                      Coverage
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      ₹{product.coverageAmount.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Base Premium
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      ₹{product.basePremium.toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>

      </main>
    </div>
  );
}

export default Products;