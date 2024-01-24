import * as p from "./parameters"
import { cartValueSurcharge, distanceFee } from "./delivery-fee-functions"

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


