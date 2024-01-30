import React, { useState } from 'react';
import './deliveryFeeCalculator.css';
import { DeliveryRequest } from './deliveryFeeStructure';
import { totalDeliveryFee } from './deliveryFeeFunctions'

/**
 * Function that calculates total delivery fee based on customer's request
 * @param props: properties defined by Delivery Request interface
 * @returns delivery fee as number
 */
export function DeliveryFeeCalculator(props: DeliveryRequest) {

  // setting initial state for request object 
  const [request, setRequest] = useState<DeliveryRequest>({
    cartValue: props.cartValue,
    deliveryDistance: props.deliveryDistance,
    amountOfItems: props.amountOfItems,
    orderTime: props.orderTime
  })

  const [deliveryFee, setDeliveryFee] = useState(0);

  const deliveryFeeRounded = deliveryFee.toFixed(2);

  const [showDeliveryFee, setShowDeliveryFee] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setShowDeliveryFee(false);
    setRequest((prevRequest) => {
      const updatedRequest = {
        ...prevRequest,
        [name]: value //input field name must correspond to property name!
      }
      return updatedRequest;
    }
    )

  }


  const calculateFee = (e: any) => {
    e.preventDefault();

    //validation: ensuring that user requests are greater than zero 
    if (request.amountOfItems <= 0 || request.cartValue <= 0 || request.deliveryDistance <= 0) {
      alert('Values must be greater than zero!')
    }

    //validation: ensuring that amountOfItems and deliveryDistance are integers
    else if ((request.amountOfItems * 10) % 10 !== 0 || (request.deliveryDistance * 10) % 10 !== 0) {
      alert('Delivery distance and amount of items must be whole numbers!')
    }

    else {
      const fee = totalDeliveryFee(request)
      setDeliveryFee(fee);
      setShowDeliveryFee(true);
    }
  }

  return (

    <body>

      <div className='container'>
        <header>
          Delivery Fee Calculator
        </header>

        <form>

          <p>
            <label htmlFor='cartValue' >
              Cart Value
            </label>
            <input
              id='cartValue'
              data-test-id='cartValue'
              type='number'
              min={0}
              name='cartValue'
              value={request.cartValue}
              onChange={handleChange}
              required
            />
            €
          </p>

          <p>
            <label htmlFor='deliveryDistance'>
              Delivery Distance
            </label>
            <input
              id='deliveryDistance'
              data-test-id='deliveryDistance'
              type='number'
              min={0}
              name='deliveryDistance'
              value={request.deliveryDistance}
              onChange={handleChange}
              required
            />
            m
          </p>

          <p>
            <label htmlFor='amountOfItems'>
              Amount of
              Items
            </label>
            <input
              id='amountOfItems'
              data-test-id='amountOfItems'
              type='number'
              min={0}
              name='amountOfItems'
              value={request.amountOfItems}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor='orderTime'>
              Order Time
            </label>
            <input
              id='orderTime'
              data-test-id='orderTime'
              type='datetime-local'
              name='orderTime'
              value={request.orderTime}
              min='2024-01-01T07:00'
              onChange={handleChange}
              required
            />
          </p>

          <button onClick={calculateFee} className='btn'> Calculate delivery price </button>
          {showDeliveryFee ?
            <div className='delivery-price'>
              <label> Delivery price: </label>
              <label data-test-id='fee' > {deliveryFeeRounded} €  </label>
            </div>
            :
            <h4> </h4>
          }

        </form>

      </div>
    </body>

  )

}
