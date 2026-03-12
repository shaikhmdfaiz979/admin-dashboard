import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { editData, postData } from "../../store/features/product/productThunk";
import { useDispatch, useSelector } from "react-redux";
import { closeAddingPopup } from "../../store/features/popup/popupSlice";

function ProductModal() {
  const { products, loading, error } = useSelector((state) => state.product);
  const { adding } = useSelector((state) => state.popup);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    info: "",
  });
//handling input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
//handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
//handling form  field
    if (!formData.name || !formData.price || !formData.image) {
      toast.error("Please fill all required fields");
      return;
    }
    //handling async tasks 
    if (adding.id) {
      dispatch(editData({ id: adding.id, details: formData }));
    } else {
      dispatch(postData({ ...formData, createdAt: new Date().toISOString() }));
    }
//emptying form field after submit
    setFormData({
      name: "",
      price: "",
      image: "",
      info: "",
    });
    //Modal Close
    dispatch(closeAddingPopup());
  };
  //editing product card
  useEffect(() => {
    if (adding.id) {
      setFormData({
        ...formData,
        name: adding.name,
        price: adding.price,
        image: adding.image,
        info: adding.info,
      });
    } else {
      setFormData({
        name: "",
        price: "",
        image: "",
        info: "",
      });
    }
  }, [adding]);
  
  if (!adding) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {adding.id ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Price */}
          <input
            type="text"
            name="price"
            placeholder="Price"
            className="input input-bordered w-full"
            value={formData.price}
            onChange={handleChange}
          />

          {/* Image URL */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="input input-bordered w-full"
            value={formData.image}
            onChange={handleChange}
          />

          {/* Info */}
          <textarea
            name="info"
            placeholder="Product Info"
            className="textarea textarea-bordered w-full"
            value={formData.info}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => dispatch(closeAddingPopup(false))}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Adding..."
                : adding.id
                  ? "Edit Product"
                  : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
