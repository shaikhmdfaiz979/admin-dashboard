import { useDispatch } from "react-redux";
import {
  openAddingPopup,
  openDeletePopup,
  openOrderPopup,
} from "../../store/features/popup/popupSlice";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(openDeletePopup(id));
  };
  const image =
    product?.image || "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <div
      key={product.id}
      className="bg-base-200 rounded-lg shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
    >
      <div className="h-40 overflow-hidden flex items-center justify-center relative group">
        <img
          src={image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-95 rounded-t-md"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <Link to={"/product/" + product.id}>
            <button className="btn btn-primary btn-sm">View Product</button>
          </Link>
        </div>
      </div>
      <div className="p-4 flex flex-col grow">
        <h2 className="font-semibold text-lg">{product.name}</h2>

        <p className="text-primary font-bold mt-1">₹ {product.price}</p>

        <p className="text-sm opacity-70 mt-2 line-clamp-3 grow">
          {product.info}
        </p>

        <div className="mt-4 flex gap-2">
          <button
            className="btn btn-sm btn-success flex-1"
            onClick={() => {
              dispatch(openOrderPopup(product));
            }}
          >
            Order
          </button>

          <button
            className="btn btn-sm btn-warning"
            onClick={() => {
              dispatch(openAddingPopup(product));
            }}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-error"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
