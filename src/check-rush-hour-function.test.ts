import { checkRushHour } from "./delivery-fee-functions";
import * as p from "./parameters";

describe('test if now is rush hour', () => {

    test('current browser time', () => {
        let result = checkRushHour();
        expect(result).toBe(false);
    })
})