import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

const ViewCart = ({ patientUsername }) => {
  const [res, setRes] = useState(null);
  const [outOfStock, setOutOfStock] = useState(false);

  useEffect(() => {
    if (patientUsername) {
      handleSubmit();
    }
  }, [patientUsername]);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/patient/viewCart`,{
        withCredentials: true,
      });
      setRes(response);
    } catch (error) {
      console.error('Error fetching cart:', error.response?.data?.error || error.message);
    }
  };

  const handleRemoveItem = async (medicineId) => {
    try {
        await axios.put(`http://localhost:8000/api/v1/patient/removeFromCart`, { medicineId: medicineId
        }, [] ,{ withCredentials: true });
  
        setRes((prevRes) => {
            const updatedItems = prevRes.data.items.filter((item) => item.medicineId._id !== medicineId);
    
            const updatedTotalPrice = updatedItems.reduce((total, item) => total + item.price, 0);
    
            if (updatedItems.length === 0) {
                return null;
            }
            else{
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
      console.error('Error removing item from cart:', error.response?.data?.error || error.message);
    }
  };
  
  

  const handleUpdateQuantity = async (medicineId, quantity) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/patient/updateQuantity`, {
        medicineId: medicineId,
        quantity: quantity
      }, [] ,{ withCredentials: true });

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
  
        const updatedTotalPrice = updatedItems2.reduce((total, item) => total + item.price, 0);
  
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
      if(error.response?.data?.error === 'This medicine is out of stock'){
        setOutOfStock(true);
      }
      console.error('Error updating quantity:', error.response?.data?.error || error.message);
    }
  };
  
  

  return (
    <div>
      <h1>My Cart</h1>
      <br />
      {res && res.data.items.length > 0 ?(
        <div>
            {res.data.items.map((item) => (
            <div key={item._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ marginRight: '10px' }}>Medicine: {item.medicineId.name}</div>
                <div style={{ marginRight: '10px' }}>Price: ${item.price}</div>
                <div>
                <button onClick={() => handleUpdateQuantity(item.medicineId._id, item.quantity - 1)}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item.medicineId._id, item.quantity + 1)}
                        disabled={outOfStock}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <button onClick={() => handleRemoveItem(item.medicineId._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                </div>
            </div>
            ))}
            <div>Total: ${res.data.totalPrice}</div>
        </div>
    ): (
        <div>Your Cart is empty</div>
      )}
    </div>
  );
};

export default ViewCart;