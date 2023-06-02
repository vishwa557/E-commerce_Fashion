import axios from "axios";
import { toast } from "react-toastify";
import config from '../config.js';

const PayButton = ({user, cartItems, selectedAddress }) => {
const serverUrl = config.serverUrl;
  // console.log(cartItems)
  const handleCheckout = () => {
    toast.success("Redirecting to payment", {
      position: "bottom-center",
      autoClose: 1000,
                style: {
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color:'white',
                  },
    });

    const formattedCartItems = cartItems.map(({  _id, quantity, price, name }) => ({
      _id,
      quantity,
      price,
      name,
   
    }));

    axios
      .post(
        `${serverUrl}api/create-checkout-session`,
        {
          cartItems: formattedCartItems,
          selectedAddress,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;

          clearCartItems();
        }
      })
      .catch((err) => console.log(err.message));
  };

  const clearCartItems = () => {
    if (user._id) {
      // Retrieve the cart from local storage
      const cart = JSON.parse(localStorage.getItem("mycart")) || {};
      // Remove the cart items of the user
      delete cart[user._id];
      // Update the local storage
      localStorage.setItem("mycart", JSON.stringify(cart));
    }
  };
  return (
    <>
      <button onClick={handleCheckout}>Check Out</button>
    </>
  );
};

export default PayButton;
