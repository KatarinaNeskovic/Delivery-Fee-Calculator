import { checkRushHour } from "./delivery-fee-functions";
import * as p from "./parameters";

describe('test if requested delivery time and date is within rush hour', () => {

    test('when time is earlier than rushhour start and day is not Friday', () => {
        const myDate = new Date('January 24, 2024 14:30:00');
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time is earlier than rushhour start and day is Friday', () => {
        const myDate = new Date('October 20, 2023 12:00:00');
        expect(checkRushHour(myDate)).toBe(false);
    })


    test('when time is later than rushhour start and day is not Friday', () => {
        const myDate = new Date('September 05, 2023 19:05:00');
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time is later than rushhour start and day is Friday', () => {
        const myDate = new Date('August 25, 2023 21:00:00');
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time equals rush hour start time but day is not Friday', () => {
        const myDate = new Date('January 16, 2024 15:00:00');
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time equals rush hour start time and day is Friday', () => {
        const myDate = new Date('August 18, 2023 15:00:00');
        expect(checkRushHour(myDate)).toBe(true);
    })

    test('when time equals rush hour end time and day is Friday', () => {
        const myDate = new Date('February 09, 2024 19:00:00');
        expect(checkRushHour(myDate)).toBe(true);
    })

    test('when time equals rush hour end time but day is not Friday', () => {
        const myDate = new Date('Mar 13, 2024 19:00:00');
        expect(checkRushHour(myDate)).toBe(false);
    })

    test('when time falls within rush hour and day is Friday', () => {
        const myDate = new Date('November 17, 2023 18:59:00');
        expect(checkRushHour(myDate)).toBe(true);
    })
})