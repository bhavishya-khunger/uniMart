import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdDone, MdOutlineCancel } from 'react-icons/md';

const ShopPrintOrders = ({ sortedOrders, user }) => {
    const [orders, setOrders] = useState(sortedOrders);

    useEffect(() => {
        setOrders(sortedOrders);
    }, [orders])

    async function cancelOrder(orderId) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SHOP_BASE_URL}/mark-as-cancelled`, {
                orderId,
                shopkeeperId: user?._id,
            });
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        } catch (error) {
            console.error("Error canceling the order:", error);
        }
    }

    async function markForPickup(orderId) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SHOP_BASE_URL}/mark-order-completed`, {
                orderId,
                shopkeeperId: user?._id,
            });
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, orderStatus: "Completed" } : order
                )
            );
        } catch (error) {
            console.error("Error marking the order for pickup:", error);
        }
    }

    return (
        <div>
            {
                orders.map((order) => {
                    
                    return (order?.orderStatus === "Pending" || order?.orderStatus === "Completed") && (
                        <div
                            key={order._id}
                            className={order?.orderStatus === "Pending" ?
                                "border mb-6 border-orange-500 border-t-8 border-t-orange-500 rounded-lg shadow-sm hover:shadow-lg transition duration-200" :
                                "border-t-8 mb-6 border border-green-500 border-t-emerald-500 rounded-lg shadow-sm hover:shadow-lg transition duration-200"}
                        >
                            {/* Header */}
                            <div className="bg-gray-100 p-4 rounded-t-lg">
                                <h5 className="text-lg font-semibold">Order ID: {order._id}</h5>
                                <p className="mt-1 text-sm text-gray-600">
                                    Status:{" "}
                                    <span className="text-green-600 font-medium">
                                        {order.orderStatus}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Prepayment:{" "}
                                    <span
                                        className={`font-medium text-red-600
                                            }`}
                                    >
                                        No
                                    </span>
                                    {" "}
                                </p>
                                <p className='text-xs text-justify bg-gray-200 px-2 py-1 rounded-lg mt-2 italic'>Please charge the usual amount for print that you charge to offline customers. App has already commissioned 5 coins from the user.</p>
                            </div>

                            {/* Products Section */}
                            <div className="p-4">
                                <h6 className="text-md font-medium mb-2">Print Link:</h6>
                                <a href={order.pdfLink} target="_blank" rel="noreferrer" className="text-blue-600 flex w-full text-wrap underline break-all">
                                    {order.pdfLink}
                                </a>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 p-4 rounded-b-lg text-sm">
                                <p className="mb-1">
                                    Comments:{" "}
                                    <span className="font-medium text-gray-800">
                                        {order?.comments || "N/A"}
                                    </span>
                                </p>
                                <p className="mb-1">
                                    Delivery Person:{" "}
                                    <span className="font-medium text-gray-800">
                                        {order.userId?.name || "N/A"}
                                    </span>
                                </p>
                                <p>
                                    Contact:{" "}
                                    <span className="font-medium text-gray-800">
                                        {order.userId?.phone || "N/A"}
                                    </span>
                                </p>
                                <p className="text-xs text-gray-500 my-2">
                                    Created At:{" "}
                                    {new Date(order.createdAt).toLocaleString("en-US", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </p>
                                {
                                    order?.orderStatus === "Completed" ?
                                        <div className='w-full justify-evenly gap-2 mt-3 flex'>
                                        </div> :
                                        <div className='w-full justify-evenly gap-2 mt-3 flex'>
                                            <button onClick={() => markForPickup(order?._id)} className="bg-green-600 rounded-xl flex items-center text-white text-left gap-2 px-2 py-1 active:scale-95">
                                                <MdDone size={24} /> Mark as Complete
                                            </button>
                                            <button onClick={() => cancelOrder(order?._id)} className="bg-red-600 rounded-xl flex items-center text-white text-left gap-2 px-2 py-1 active:scale-95">
                                                <MdOutlineCancel size={24} /> Decline
                                            </button>
                                        </div>
                                }
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default ShopPrintOrders
