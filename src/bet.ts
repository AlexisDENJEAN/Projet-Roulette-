
import type { SpinResult } from "./roulette";

export type BetType = "number" | "color" | "evenOdd" | "highLow";

export interface Bet {
        type: BetType;
        value: number | "red" | "black" | "green" | "even" | "odd" | "high" | "low";
        amount: number;
    }
class BetValidator {
        static validate(bet: Bet): boolean {
   
            if (bet.type === "number") {
                return bet.amount >= 1 && bet.amount <= 10;
            }
            if (bet.type === "color" || bet.type === "evenOdd" || bet.type === "highLow") {
                return bet.amount >= 5 && bet.amount <= 50;
            }
            return false;
        }
    
        static getPayout(bet: Bet, result: SpinResult): number {
            // mise sur un numéro précis
            if (bet.type === "number" && bet.value === result.number) {
                return bet.amount * 35; // paye 35Xla mise + la mise   
            }
            // mise sur une couleur
            if (bet.type === "color" && bet.value === result.color) {
                return bet.amount * 2; // paye 2Xla mise
            }
            // mise sur pair/impair
            if (bet.type === "evenOdd") {
                if (bet.value === "even" && result.isEven) return bet.amount * 2; // paye 2Xla mise
                if (bet.value === "odd" && result.isOdd) return bet.amount * 2; // paye 2Xla mise
            }
            // mise sur haut/bas
            if (bet.type === "highLow") {
                if (bet.value === "high" && result.isHigh) return bet.amount * 2; // paye 2Xla mise
                if (bet.value === "low" && result.isLow) return bet.amount * 2; // paye 2Xla mise
            }
            return 0; // perd la mise
        }
    }