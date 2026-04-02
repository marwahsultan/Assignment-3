import { handleInput, clearInput } from '../Order.js';

describe("Tests all stages of a takeout order", function () {

    beforeEach(function () {
        clearInput();
    });

    it("test welcome", function () {
        const aResults = handleInput("hello");
        expect(aResults[0]).toBe("Welcome to Hot Off the Press Cafe!");
    });

    it("test placing an order", function () {
        handleInput("hello");
        const aResults = handleInput("latte");
        expect(aResults[0]).toBe("You ordered: latte.");
    });

    it("test order confirmation yes", function () {
        handleInput("hello");
        handleInput("latte");
        const aResults = handleInput("yes");
        expect(aResults[0]).toBe("Your order for latte has been placed!");
    });

    it("test order confirmation no", function () {
        handleInput("hello");
        handleInput("latte");
        const aResults = handleInput("no");
        expect(aResults[0]).toBe("No problem! Your order was cancelled.");
    });

});