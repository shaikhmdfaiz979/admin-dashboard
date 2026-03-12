import { useDispatch, useSelector } from "react-redux";
import {
  closeDeletePopup,
} from "../../store/features/popup/popupSlice";
import { deleteOrder } from "../../store/features/order/orderThunk";

function DeleteOrderModal({ onClose, onConfirm }) {
  const dispatch = useDispatch();
  const popup = useSelector((state) => state.popup.delete);
  if (!popup) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete this order?</h3>

        <p className="py-4">This action cannot be undone.</p>

        <div className="modal-action">
          <button className="btn" onClick={() => dispatch(closeDeletePopup())}>
            Cancel
          </button>

          <button
            className="btn btn-error"
            onClick={() => {
              dispatch(deleteOrder(popup));
              dispatch(closeDeletePopup());
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteOrderModal;
