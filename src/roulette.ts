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
    const number = this.numbers[Math.floor(Math.random() * this.numbers.length)]!;
    let color: color;
    if (number === 0) color = "green";
    else if (this.rednumbers.includes(number)) color = "red";
    else color = "black";
    return {
        number,
        color,
        isEven: number !== 0 && number % 2 === 0,
        isOdd: number % 2 === 1,
        isHigh: number >= 19 && number <= 36,
        isLow: number >= 1 && number <= 18
    };
}
}