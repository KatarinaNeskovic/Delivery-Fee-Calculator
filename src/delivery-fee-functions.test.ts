import * as p from "./parameters"
import { cartValueSurcharge, distanceFee, checkRushHour, extraItemsFee } from "./delivery-fee-functions"


describe('Test cart value surcharge function', () => {

    test('when cart value is less than minimum cart value', () => {
        const price = p.minCartValue - 1.0;
        const result = cartValueSurcharge(price) + price;
        expect(result).toEqual(p.minCartValue);
    })
    test('when cart value equals minimum cart value', () => {
        const price = p.minCartValue;
        const result = cartValueSurcharge(price) + price;
        expect(result).toEqual(p.minCartValue);
    })

    test('when cart value is greater than minimum cart value', () => {
        const price = p.minCartValue + 2.5;
        const result = cartValueSurcharge(price) + price;
        expect(result).toEqual(price);
    })
})



describe('Test distance fee function', () => {

    test('when distance is smaller than min distance segment', () => {
        const distance = p.firstDistanceSegment - 500.0; //500m
        const result = distanceFee(distance);
        expect(result).toEqual(p.minDistanceFee); //2 eur
    })

    test('when distance is equal to the min distance segment', () => {
        const distance = p.firstDistanceSegment; //1000m
        const result = distanceFee(distance);
        expect(result).toEqual(p.minDistanceFee); //2eur
    })

    test('when distance is greater than min distance segment but less the 1st extra distance segment', () => {
        const distance = p.firstDistanceSegment + 499.0;  //1499m
        const result = distanceFee(distance);
        expect(result).toEqual(p.minDistanceFee + p.extraDistanceFee); //to equal 3eur
    })

    test('when distance is greater than min distance segment but equal to 1st extra distance segment', () => {
        const distance = p.firstDistanceSegment + 500.0;  //1500m
        const result = distanceFee(distance);
        expect(result).toEqual(p.minDistanceFee + p.extraDistanceFee); //to equal 3eur
    })

    test('when distance is greater than min distance segment and greater than 2nd extra distance segment', () => {
        const distance = p.firstDistanceSegment + 501.0;  //1501m
        const result = distanceFee(distance);
        expect(result).toEqual(p.minDistanceFee + 2 * p.extraDistanceFee); //to equal 4eur
    })

    test('when distance is greater than min distance segment and greater than 3rd extra distance segment', () => {
        const distance = p.firstDistanceSegment + 1001.0;  //2001m
        const result = distanceFee(distance);
        expect(result).toEqual(p.minDistanceFee + 3 * p.extraDistanceFee); //to equal 5eur
    })

    test('when distance is greater than min distance segment and greater than 6th extra distance segment', () => {
        const distance = p.firstDistanceSegment + 3005.0;  //4005m
        const result = distanceFee(distance);
        expect(result).toEqual(p.minDistanceFee + 7 * p.extraDistanceFee); //to equal 9eur
    })
})



describe('Test extra items fee function', () => {

    test('when number of items in the cart is lower than maximum surcharge-free items number ', () => {
        const items = p.maxSurchargeFreeItemsNo - 2.0; //2
        let result = extraItemsFee(items);
        expect(result).toEqual(0)
    })

    test('when number of items in the cart is equal to the maximum surcharge-free items number ', () => {
        const items = p.maxSurchargeFreeItemsNo; //2
        let result = extraItemsFee(items);
        expect(result).toEqual(0)
    })

    test('when number of items in the cart is greater than maximum surcharge-free items number, but lower than bulk items minimum number', () => {
        const items = p.maxSurchargeFreeItemsNo + 1.0; // 5 items
        let result = extraItemsFee(items);
        expect(result).toEqual((items - p.maxSurchargeFreeItemsNo) * p.extraItemsSurcharge) // 0.5eur
    })

    test('when number of items in the cart is equal to bulk items minimum number', () => {
        const items = p.maxSurchargeFreeItemsNo + 8.0; // 12 items
        let result = extraItemsFee(items);
        expect(result).toEqual((items - p.maxSurchargeFreeItemsNo) * p.extraItemsSurcharge)  // 4
    })

    test('when number of items in the cart is greater than bulk items minimum number', () => {
        const items = p.maxSurchargeFreeItemsNo + 9.0; // 13 items
        let result = extraItemsFee(items);
        expect(result).toEqual((items - p.maxSurchargeFreeItemsNo) * p.extraItemsSurcharge + p.bulkItemsFee) // 5.7
    })

    test('when number of items in the cart is greater than bulk items minimum number', () => {
        const items = p.maxSurchargeFreeItemsNo + 10.0; // 14 items
        let result = extraItemsFee(items);
        expect(result).toEqual((items - p.maxSurchargeFreeItemsNo) * p.extraItemsSurcharge + p.bulkItemsFee) // 6.2
    })
})



describe('Test check rush hour function', () => {

    test('when time is earlier than rushhour start and day is not Friday', () => {
        const myDate = '2024-01-24T14:30' //Wednesday, January 24, 2024 14:30:00');  
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time is earlier than rushhour start and day is Friday', () => {
        const myDate = '2023-10-20T12:00'; //Friday, October 20, 2023 12:00:00
        expect(checkRushHour(myDate)).toBe(false);
    })


    test('when time is later than rushhour start and day is not Friday', () => {
        const myDate = '2023-09-05T19:05'; //Tuesday, September 05, 2023 19:05:00
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time is later than rushhour start and day is Friday', () => {
        const myDate = '2023-08-25T21:00'; //Friday, August 25, 2023 21:00:00
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time equals rush hour start time but day is not Friday', () => {
        const myDate = '2024-01-16T15:00'; //Tuesday, January 16, 2024 15:00:00
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time equals rush hour start time and day is Friday', () => {
        const myDate = '2023-08-18T15:00'; //Friday, August 18, 2023 15:00:00
        expect(checkRushHour(myDate)).toBe(true);
    })

    test('when time equals rush hour end time and day is Friday', () => {
        const myDate = '2024-02-09T19:00'; // Friday, February 09, 2024 19:00:00
        expect(checkRushHour(myDate)).toBe(true);
    })

    test('when time equals rush hour end time but day is not Friday', () => {
        const myDate = '2024-03-13T19:00'; // Wednesday, Mar 13, 2024 19:00:00
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time falls just before rush hour end time and day is Friday', () => {
        const myDate = '2023-11-17T18:59'; // Friday, November 17, 2023 18:59:00
        expect(checkRushHour(myDate)).toBe(true);
    })

    test('when time falls just after rush hour star time and day is Friday', () => {
        const myDate = '2023-05-12T15:02'; // Friday, May 12, 2023 15:02:00
        expect(checkRushHour(myDate)).toBe(true);
    })
})



/* import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
 */