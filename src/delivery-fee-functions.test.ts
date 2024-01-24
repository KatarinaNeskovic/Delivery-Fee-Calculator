import * as p from "./parameters"
import { cartValueSurcharge } from "./delivery-fee-functions"

describe('Test adjusting cart value', () => {
    test('when cart value less than minimum cart value', () => {
        const price = p.minCartValue - 1.0;
        const result = cartValueSurcharge(price) + price;
        expect(result).toEqual(p.minCartValue);
    })
    test('when cart value equal to minimum cart value', () => {
        const price=p.minCartValue;
        const result = cartValueSurcharge(price)+ price;
        expect(result).toEqual(p.minCartValue);
    })

    test('when cart value greater than  minimum cart value', () => {
        const price=p.minCartValue + 2.5;
        const result = cartValueSurcharge(price)+ price;
        expect(result).toEqual(price);
    })
})