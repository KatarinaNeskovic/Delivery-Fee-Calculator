import { extraItemsFee } from "./delivery-fee-functions"
import * as p from "./parameters"

describe('test extra items fee function', () => {

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