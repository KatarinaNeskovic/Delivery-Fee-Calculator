import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { DeliveryFee } from './delivery-fee-structure';

function App() {

  // setting initial state of delivery fee object where proprs are input fields the user will fill on the form 
  const [deliveryFee, setDeliveryFee] = useState<DeliveryFee>({
    cartValue: 0,
    deliveryDistance: 0,
    amountOfItems: 0,
    orderTime: '2001-01-01T11:00', //providing string value for the initial date - 01.01.2001 at 11:00
    deliveryPrice: 0
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target; //deconstructing e.target object to access its name and value props
    setDeliveryFee({
      ...deliveryFee,
      [name]: value
    })
  }

  //this should get triggered by button and should trigger delivery fee function 
  const handleSubmit = (e: any) => {
    e.preventDefault();
  }

  return (

    <form onSubmit={handleSubmit} className='form' >

      <header>
        Calculate your delivery fee
      </header>

      <label>
        Cart Value
        <input
          type="number"
          min={0}
          name="cartValue"
          value={deliveryFee.cartValue}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Delivery Distance
        <input
          type="number"
          min={0}
          name="deliveryDistance"
          value={deliveryFee.deliveryDistance}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Amount of Items
        <input
          type="number"
          min={0}
          name="amountOfItems"
          value={deliveryFee.amountOfItems}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Order Time
        <input
          type="datetime-local"
          name='dateTime'
          onChange={handleChange}
          required
        />
      </label>

      <button type='submit'> Calculate delivery price </button>
      <h4> Delivery price: EUR</h4>
    </form>
  )

}

export default App;


/*
  const [cartValue, setCartValue] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [amountOfItems, setAmountOfItems] = useState(0);
  const [dateTime, setDateTime] = useState(new Date(2001, 0, 1)); //setting initial date to January 1st 2001
 
  const handleCartvalueChange = (e: any) => {
    setCartValue(e.target.value);
  }
 
  const handleDeliveryDistanceChange = (e: any) => {
    setDeliveryDistance(e.target.value);
  }
 
  const handleAmountOfItemsChange = (e: any) => {
    setAmountOfItems(e.target.value);
  }
 
  const handleDateTimeChange = (e: any) => {
    setDateTime(e.target.value);
  }
 */



/*   <header> { className="App-header" }
<img src={logo} className="App-logo" alt="logo" /> 
</header> */