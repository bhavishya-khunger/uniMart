import axios from 'axios';
import React, { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md';

const Item = ({ itemId, onAddToCart, onRemoveFromCart, cartQty, itemPrice, itemName, itemImage, isVeg, itemDesc, options }) => {
    const [quantity, setQuantity] = useState(cartQty);

    const updateQuantity = (change) => {
        setQuantity((prev) => Math.max(0, prev + change));
    };

    const deleteProduct = async () => {
        try {
            alert("Are you sure you want to remove this product from the menu?");
            const res = await axios.get(`${import.meta.env.VITE_PRODUCT_BASE_URL}/delete/${itemId}`);
            // console.log(res);


        } catch (error) {
            // console.log(error);


        }
    }

    return (
        <div className="w-full flex items-center justify-between h-32 my-4 py-[3px]">
            <div className='flex flex-col'>
                {isVeg ? <div
                    className="h-4 w-4 bg-cover mb-2"
                    style={{ backgroundImage: "url('https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg')" }}
                ></div> :
                    <div
                        className="h-4 w-4 bg-cover mb-2"
                        style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png')" }}
                    ></div>}
                <h2 className="text-lg font-semibold mb-1">{itemName}</h2>
                <p id="para1" className="text-xs italic text-gray-600 mb-1 w-48">
                    {itemDesc}
                </p>
                <p className='text-sm font-semibold italic'>Rs. {itemPrice}/-</p>
            </div>
            <div className='h-full flex flex-col items-center justify-center'>
                <div className='h-4/6'>
                    <img className='h-full w-24 rounded-xl' src={itemImage} alt="" />
                    {/* Order Quantity */}
                </div>
                {!options && <MdDeleteForever onClick={() => deleteProduct()} className='mt-2' size={22} />}
                {options && (
                    <div className="flex items-center h-2/6">
                        <button
                            className="bg-gray-200 text-black px-2 border border-gary-200 rounded-l"
                            onClick={() => {
                                updateQuantity(-1);
                                onRemoveFromCart();
                            }}
                        >
                            -
                        </button>
                        <span className="w-8 text-center border-t border-b border-gray-200">
                            {quantity}
                        </span>
                        <button
                            className="bg-gray-200 border border-gray-200 text-black px-2 rounded-r"
                            onClick={() => {
                                updateQuantity(1);
                                onAddToCart();
                            }}
                        >
                            +
                        </button>
                    </div>)}
            </div>
        </div>
    )
}

export default Item
