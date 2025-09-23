export type color = "red" | "black" | "green";
export interface SpinResult {
    number: number;
    color: color;
    isEven: boolean;
    isOdd: boolean;
    isHigh: boolean;
    isLow: boolean;
}
export type BetType = "number" | "color" | "evenOdd" | "highLow";
export interface Bet {
    type: BetType;
    value: number | "red" | "black" | "green" | "even" | "odd" | "high" | "low";
    amount: number;
}
//# sourceMappingURL=index.d.ts.map