import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductModal from "../components/products/ProductModal";
import OrderModal from "../components/orders/OrderModal";
import DeleteProductModal from "../components/products/DeleteProductModal";
import ProductCard from "../components/products/ProductCard";

import { fetchData } from "../store/features/product/productThunk";
import { openAddingPopup } from "../store/features/popup/popupSlice";

function Products() {
  const { products, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const filteredProducts = products?.filter((product) =>
    product?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-15">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="flex gap-3 w-full md:w-auto">

          <input
            type="text"
            placeholder="Search product..."
            className="input input-bordered w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={() => dispatch(openAddingPopup(true))}
          >
            Add Product
          </button>

        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts?.length === 0 ? (
        <div className="text-center py-10 opacity-60">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>
      )}

      {/* Modals */}
      <ProductModal />
      <OrderModal />
      <DeleteProductModal />

    </div>
  );
}

export default Products;
