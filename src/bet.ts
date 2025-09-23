        export type BetType = "number" | "color" | "evenOdd" | "highLow";

    export interface Bet {
        type: BetType;
        value: number | "red" | "black" | "green" | "even" | "odd" | "high" | "low";
        amount: number;
    }

    class BetValidator {
        static validate(bet: Bet): boolean {
            if (bet.type === "number") return bet.amount >= 1 && bet.amount <= 10;
            return false;
        }
    }

    module.exports = { BetValidator };