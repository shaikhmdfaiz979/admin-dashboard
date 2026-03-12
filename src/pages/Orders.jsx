import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editOrder, fetchOrder } from "../store/features/order/orderThunk";
import { FiTrash2 } from "react-icons/fi";
import DeleteOrderModal from "../components/orders/DeleteOrderModal";
import { openDeletePopup } from "../store/features/popup/popupSlice";

function Orders() {
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrder());
  }, []);

  const updateStatus = async (id, status) => {
    dispatch(editOrder({ id, details: { status } }));
  };
  const handleDeleteOrder = (id) =>{
    dispatch(openDeletePopup(id))
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          No orders found
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-300 shadow-xl rounded-sm">
          <table className="table table-zebra">
            <thead className="bg-base-200 text-sm">
              <tr className="text-center">
                <th>Customer</th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
                <th>Info</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover text-center">
                  {/* Customer */}
                  <td className="font-medium">{order.customerName}</td>
                  {/* Product */}
                  <td>
                    <div className="flex flex-col items-center gap-2 text-center">
                      <img
                        src={order.image}
                        alt={order.productName}
                        className="w-16 h-16 object-contain rounded-md bg-base-200 p-1"
                      />

                      <span className="text-sm font-medium">
                        {order.productName}
                      </span>
                    </div>
                  </td>
                  {/* Price */}
                  <td className="font-medium">₹ {order.price}</td>
                  {/* Qty */}
                  <td>{order.qty}</td>
                  {/* Total */}
                  <td className="font-semibold">₹ {order.totalAmount}</td>
                  {/* Status */}
                  <td>
                    <select
                      className="select select-bordered select-sm min-w-28"
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  {/* Info */}
                  <td className="align-middle">
                    <div className="flex items-center justify-center text-center text-sm text-gray-500 max-w-55 mx-auto max-[992px]:line-clamp-2 lg:line-clamp-3">
                      {order.info}
                    </div>
                  </td>
                  {/* delete button */}
                  <td>
                    <button
                      className="btn btn-sm btn-error btn-outline"
                      onClick={() =>handleDeleteOrder(order.id)}
                    >
                      <FiTrash2 size={15}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <DeleteOrderModal/>
    </div>
  );
}

export default Orders;
