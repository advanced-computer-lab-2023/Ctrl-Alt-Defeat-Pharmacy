import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../Css/PatientHome.css";
import "../Css/Cart.css";
import { useNavigate } from "react-router-dom";

const ViewCart = () => {
  const [res, setRes] = useState(null);
  const [outOfStock, setOutOfStock] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/patient/viewCart`,
        { withCredentials: true }
      );
      setRes(response);

      setIsLoading(false);
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error.response?.data?.error || error.message
      );
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async (medicineId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/patient/removeFromCart`,
        { medicineId: medicineId },
        { withCredentials: true }
      );

      setRes((prevRes) => {
        const updatedItems = prevRes.data.items.filter(
          (item) => item.medicineId._id !== medicineId
        );

        const updatedTotalPrice = updatedItems.reduce(
          (total, item) => total + item.price,
          0
        );

        if (updatedItems.length === 0) {
          return null;
        } else {
          return {
            ...prevRes,
            data: {
              ...prevRes.data,
              items: updatedItems,
              totalPrice: updatedTotalPrice,
            },
          };
        }
      });
    } catch (error) {
      console.error(
        "Error removing item from cart:",
        error.response?.data?.error || error.message
      );
    }
  };

  const handleUpdateQuantity = async (medicineId, quantity) => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/patient/updateQuantity`,
        {
          medicineId: medicineId,
          quantity: quantity,
        },
        { withCredentials: true }
      );

      setOutOfStock(false);

      setRes((prevRes) => {
        const updatedItems = prevRes.data.items.map((item) => {
          if (item.medicineId._id === medicineId) {
            if (quantity <= 0) {
              return null;
            }

            const newPrice = item.medicineId.price * quantity;

            return {
              ...item,
              quantity,
              price: newPrice,
            };
          }
          return item;
        });

        const updatedItems2 = updatedItems.filter((item) => item !== null);

        const updatedTotalPrice = updatedItems2.reduce(
          (total, item) => total + item.price,
          0
        );

        return {
          ...prevRes,
          data: {
            ...prevRes.data,
            items: updatedItems2,
            totalPrice: updatedTotalPrice,
          },
        };
      });
    } catch (error) {
      if (error.response?.data?.error === "This medicine is out of stock") {
        setOutOfStock(true);
      }
      console.error(
        "Error updating quantity:",
        error.response?.data?.error || error.message
      );
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="top-navigation">
          <Link to="/" className="logo">
            Logo
          </Link>
          <Link to="/patients/home">Home</Link>
          <Link to="/patients/medicines">Medicines</Link>
          <Link to="/patients/viewOrder">Orders</Link>
          <Link to="/patients/viewCart">Cart</Link>
        </div>
        <div className="container">
          <h2 className="loading">Loading cart...</h2>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="top-navigation">
        <Link to="/patients/home">CTRL-ALT-DEFEAT Pharmacy</Link>
        <Link to="/patients/home">Home</Link>
        <Link to="/patients/medicines">Medicines</Link>
        <Link to="/patients/viewOrder">Orders</Link>
        <Link to="/patients/viewCart">Cart</Link>
      </div>
      <div className="cart-container">
        <h1>My Cart</h1>
        <br />
        {res && res.data.items.length > 0 ? (
          <div>
            {res.data.items.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="medicine-details">
                  <div className="medicine-info">
                    <img
                      src={item.medicineId.picture}
                      alt={item.medicineId.name}
                      className="medicine-picture"
                    />
                    <div>
                      <div>{item.medicineId.name}</div>
                      <div>Price: ${item.price}</div>
                    </div>
                  </div>
                  <div className="quantity-actions">
                    <button
                      style={{ margin: "0 10px" }}
                      onClick={() =>
                        handleUpdateQuantity(
                          item.medicineId._id,
                          item.quantity - 1
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                    <button
                      style={{ margin: "0 10px" }}
                      onClick={() =>
                        handleUpdateQuantity(
                          item.medicineId._id,
                          item.quantity + 1
                        )
                      }
                      /*disabled={outOfStock}*/
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      className="trash-button"
                      style={{ margin: "0 10px" }}
                      onClick={() => handleRemoveItem(item.medicineId._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="cart-total">Total: ${res.data.totalPrice}</div>
            <button
              className="checkout-button"
              onClick={() => navigate("/patients/checkout")}
            >
              Checkout
            </button>
          </div>
        ) : (
          <div className="empty-cart">Your Cart is empty</div>
        )}
      </div>
      <br />
      <Link to="/patients/home">home</Link>
    </div>
  );
};

export default ViewCart;
