import { useEffect, useState } from "react";
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
  const [quoteLoading, setQuoteLoading] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const customerId = 1; // temporary - we'll get this from the logged-in user later

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to load products:", error);
        setMessage("Unable to load insurance products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleGetQuote = async (productId: number) => {
    setQuoteLoading(productId);
    setMessage("");

    try {
      const response = await api.post(
        `/quotes?customerId=${customerId}&productId=${productId}`
      );

      console.log("Quote created:", response.data);

      setMessage(
        `Quote created successfully! Quote ID: ${response.data.id}`
      );
    } catch (error) {
      console.error("Failed to create quote:", error);
      setMessage("Unable to create quote.");
    } finally {
      setQuoteLoading(null);
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
            Insurance Products
          </h2>

          <p className="mt-2 text-slate-500">
            Explore insurance plans available to you.
          </p>
        </div>

        {message && (
          <div className="mb-6 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
            {message}
          </div>
        )}

        {products.length === 0 ? (
          <p className="text-slate-500">
            No insurance products available.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {product.name}
                  </h3>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {product.type}
                  </span>
                </div>

                <p className="mb-6 text-sm text-slate-500">
                  {product.description}
                </p>

                <div className="space-y-3 border-t pt-4">

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">
                      Coverage
                    </span>

                    <span className="font-semibold text-slate-900">
                      ₹{product.coverageAmount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">
                      Base Premium
                    </span>

                    <span className="font-semibold text-slate-900">
                      ₹{product.basePremium.toLocaleString("en-IN")}
                    </span>
                  </div>

                </div>

                <button
                  onClick={() => handleGetQuote(product.id)}
                  disabled={quoteLoading === product.id}
                  className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {quoteLoading === product.id
                    ? "Creating Quote..."
                    : "Get Quote"}
                </button>

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default Products;