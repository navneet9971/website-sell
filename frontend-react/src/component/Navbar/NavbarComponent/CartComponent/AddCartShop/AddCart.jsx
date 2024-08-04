
import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import useCountNum from '../../../../../globalComponent/countNumber/useCountNum';
import { useNavigate } from 'react-router-dom';

const AddCart = () => {
  const navigate = useNavigate()
  const cartCount = useCountNum((state) => state.cartCount);

  const handleViewCart = () => {
    navigate(`/navbar/cartInfo`);
    console.log("working")
  };

  return (
    <div className="relative">
      <button onClick={handleViewCart} className="relative">
        <FiShoppingCart size={28} className="text-blue-600" />
        {cartCount > 0 && (
          <span className="absolute -top-1.5 -right-2.5 text-white bg-red-500 rounded-full px-1 py-.5 text-xs">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default AddCart;
