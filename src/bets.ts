import type { Bet } from './bet';

export const bets: Bet[] = [
    { type: "number", value: 7, amount: 5 },
    { type: "color", value: "red", amount: 10 },
    { type: "evenOdd", value: "even", amount: 10 },
    { type: "highLow", value: "high", amount: 20 }
];
