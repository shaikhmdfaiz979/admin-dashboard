import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSingleProduct,
  deleteData,
} from "../../store/features/product/productThunk";
import { openAddingPopup, openDeletePopup, openEditPopup } from "../../store/features/popup/popupSlice";
import SingleProductModal from "./SingleProductModal";
import DeleteProductModal from "../products/DeleteProductModal";

function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProduct, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(openDeletePopup(id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Product Details</h1>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => dispatch(openEditPopup(singleProduct))}
            className="btn btn-warning btn-sm"
          >
            Edit
          </button>

          <button onClick={handleDelete} className="btn btn-error btn-sm">
            Delete
          </button>

          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-sm"
          >
            Back
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="card bg-base-100 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
          {/* Image */}
          <div className="flex justify-center items-center bg-base-200 rounded-lg p-4">
            <img
              src={singleProduct?.image}
              alt={singleProduct?.name}
              className="max-h-72 md:max-h-96 object-contain"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-60">Product Name</p>
              <h2 className="text-lg md:text-xl font-semibold">
                {singleProduct?.name}
              </h2>
            </div>

            <div>
              <p className="text-sm opacity-60">Price</p>
              <p className="text-lg text-primary font-semibold">
                ₹ {singleProduct?.price}
              </p>
            </div>

            <div>
              <p className="text-sm opacity-60">Description</p>
              <p className="text-sm md:text-base leading-relaxed wrap-break-word">
                {singleProduct?.info}
              </p>
            </div>

            <div>
              <p className="text-sm opacity-60">Product ID</p>
              <span className="badge badge-outline">{singleProduct?.id}</span>
            </div>
          </div>
        </div>
          </div>
      <SingleProductModal />
      <DeleteProductModal/>
    </div>
  );
}

export default SingleProduct;