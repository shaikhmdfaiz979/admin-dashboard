import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { closeOrderPopup } from "../../store/features/popup/popupSlice";
import { postOrder } from "../../store/features/order/orderThunk";

function OrderModal() {
  const popup = useSelector((state) => state.popup.order);
  const { loading } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({ customerName: "", qty: 1 });
  const dispatch = useDispatch();
  if (!popup) return null;

  const totalAmount = Number(popup?.price) * formData.qty;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerName) {
      toast.error("Enter customer name");
      return;
    }
    dispatch(
      postOrder({
        ...formData,
        productName: popup.name,
        image: popup.image,
        info: popup.info,
        price: popup.price,
        status:'Pending',
        totalAmount:formData.qty*popup.price,
      }),
    );
     dispatch(closeOrderPopup())
  };

  return (
    <div className="modal modal-open">
      <div className="bg-base-100 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Order: {popup?.name}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Customer Name"
            className="input input-bordered w-full"
            value={formData.customerName}
            onChange={handleChange}
            name="customerName"
          />

          <input
            type="number"
            min="1"
            className="input input-bordered w-full"
            value={formData.qty}
            onChange={handleChange}
            name="qty"
          />

          <div className="font-semibold">Total: ₹ {totalAmount}</div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                dispatch(closeOrderPopup());
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Placing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderModal;
