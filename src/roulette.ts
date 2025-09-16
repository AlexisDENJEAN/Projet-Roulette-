export type color = "red" | "black" | "green";

export interface SpinResult {
    number: number; // 0-36
    color: color;
    isEven: boolean;
    isOdd: boolean;
    isHigh: boolean; // 19-36
    isLow: boolean;  // 1-18
}
export class Roulette {
    private numbers: number[] = Array.from({ length: 37 }, (_, i) => i); // 0 to 36

    private rednumbers: number[] = [
        1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
    ];  
    
    spin(): SpinResult {