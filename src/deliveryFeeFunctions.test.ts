import * as p from "./deliveryFeeParameters"
import { smallOrderSurcharge, distanceFee, checkRushHour, extraItemsFee, totalDeliveryFee } from "./deliveryFeeFunctions"


describe('Test cart value surcharge function', () => {

    test('when cart value is less than minimum surcharge-free cart value', () => {
        const price = p.minCartValue - 1.0;
        const result = smallOrderSurcharge(price) + price;
        expect(result).toEqual(p.minCartValue);
    })
    test('when cart value equals minimum cart value', () => {
        const price = p.minCartValue;
        const result = smallOrderSurcharge(price) + price;
        expect(result).toEqual(p.minCartValue);
    })

    test('when cart value is greater than minimum cart value', () => {
        const price = p.minCartValue + 2.5;
        const result = smallOrderSurcharge(price) + price;
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

    test('when distance is greater than min distance segment but equal to the 1st extra distance segment', () => {
        const distance = p.firstDistanceSegment + 500.0;  //1500m
        const result = distanceFee(distance);
        expect(result).toEqual(p.minDistanceFee + p.extraDistanceFee); //to equal 3eur
    })

    test('when distance is greater than min distance segment and falls in the 2nd extra distance segment', () => {
        const distance = p.firstDistanceSegment + 501.0;  //1501m
        const result = distanceFee(distance);
        expect(result).toEqual(p.minDistanceFee + 2 * p.extraDistanceFee); //to equal 4eur
    })

    test('when distance is greater than min distance segment and falls in the 3rd extra distance segment', () => {
        const distance = p.firstDistanceSegment + 1001.0;  //2001m
        const result = distanceFee(distance);
        expect(result).toEqual(p.minDistanceFee + 3 * p.extraDistanceFee); //to equal 5eur
    })

    test('when distance is greater than min distance segment and falls in the 7th extra distance segment', () => {
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
        const myDate = '2024-01-24T14:30' 
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time is earlier than rushhour start and day is Friday', () => {
        const myDate = '2023-10-20T12:00'; 
        expect(checkRushHour(myDate)).toBe(false);
    })


    test('when time is later than rushhour end and day is not Friday', () => {
        const myDate = '2023-09-05T19:05'; 
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time is later than rushhour end and day is Friday', () => {
        const myDate = '2023-08-25T21:00'; 
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time equals rush hour start time but day is not Friday', () => {
        const myDate = '2024-01-16T15:00'; 
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time equals rush hour start time and day is Friday', () => {
        const myDate = '2023-08-18T15:00'; 
        expect(checkRushHour(myDate)).toBe(true);
    })

    test('when time equals rush hour end time and day is Friday', () => {
        const myDate = '2024-02-09T19:00'; 
        expect(checkRushHour(myDate)).toBe(true);
    })

    test('when time equals rush hour end time but day is not Friday', () => {
        const myDate = '2024-03-13T19:00'; 
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time falls just before rush hour end time and day is Friday', () => {
        const myDate = '2023-11-17T18:59'; 
        expect(checkRushHour(myDate)).toBe(true);
    })

    test('when time falls just after rush hour start time and day is Friday', () => {
        const myDate = '2023-05-12T15:02'; 
        expect(checkRushHour(myDate)).toBe(true);
    })
})



describe('Test total delivery fee function', () => {

    test('when cart value is equal to min cart value that qualifies for free delivery', () => {

        expect(totalDeliveryFee(
            {
                cartValue: 200,
                numberOfItems: 5,
                deliveryDistance: 1000,
                orderTime: '2023-05-12T15:02'
            }
        )).toEqual(0);
    });


    test('when cart value is greater than min cart value that qualifies for free delivery', () => {

        expect(totalDeliveryFee(
            {
                cartValue: 205,
                numberOfItems: 5,
                deliveryDistance: 1000,
                orderTime: '2023-05-12T15:02'
            }
        )).toEqual(0);
    });

    test('when surcharges apply for all user inputs, except bulk charge', () => {

        expect(totalDeliveryFee(
            {
                cartValue: 8, //surcharge 2eur
                numberOfItems: 5,  // surcharge 0.5c
                deliveryDistance: 1800,  //surcharge 4eur 
                orderTime: '2024-02-09T19:00',  //rush hour (multiplied by 1.2)
            }
        )).toEqual(7.8);
    });

    test('when surcharges apply for all user inputs incl. bulk charge and delivery fee is greater than maximum delivery fee', () => {

        expect(totalDeliveryFee(
            {
                cartValue: 5,   //surcharge 5eur
                numberOfItems: 13,  //surcharge 5.7eur
                deliveryDistance: 2001,  //surcharge 5eur 
                orderTime: '2023-08-18T15:00',  //rush hour (multiplied by 1.2)
            }
        )).toEqual(15.0);
    });
    
    test('when surcharges apply for all user inputs except number of items', () => {

        expect(totalDeliveryFee(
            {
                cartValue: 7.5,   //surcharge 2.5eur
                numberOfItems: 4, 
                deliveryDistance: 2001,  //surcharge 5eur 
                orderTime: '2023-08-18T15:00',  //rush hour (multiplied by 1.2)
            }
        )).toEqual(9);
    });

    test('when surcharges apply for all user inputs and minimum distance fee applies to distance ', () => {

        expect(totalDeliveryFee(
            {
                cartValue: 7,   // surcharge 3eur
                numberOfItems: 14,  // surcharge 6.2
                deliveryDistance: 1000,  //min surcharge 2eur
                orderTime: '2024-03-15T19:00' 
            }
        )).toEqual(13.44);
    });
    

})