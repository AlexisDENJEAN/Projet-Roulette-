"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Roulette {
    numbers = Array.from({ length: 37 }, (_, i) => i); // 0 to 36
    rednumbers = [
        1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
    ];
    spin() {
        const number = this.numbers[Math.floor(Math.random() * this.numbers.length)];
        let color;
        if (number === 0)
            color = "green";
        else if (this.rednumbers.includes(number))
            color = "red";
        else
            color = "black";
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
class BetValidator {
    static validate(bet) {
        if (bet.type === "number") {
            return bet.amount >= 1 && bet.amount <= 10;
        }
        if (bet.type === "color" || bet.type === "evenOdd" || bet.type === "highLow") {
            return bet.amount >= 5 && bet.amount <= 50;
        }
        return false;
    }
    static getPayout(bet, result) {
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
            if (bet.value === "even" && result.isEven)
                return bet.amount * 2; // paye 2Xla mise
            if (bet.value === "odd" && result.isOdd)
                return bet.amount * 2; // paye 2Xla mise
        }
        // mise sur haut/bas
        if (bet.type === "highLow") {
            if (bet.value === "high" && result.isHigh)
                return bet.amount * 2; // paye 2Xla mise
            if (bet.value === "low" && result.isLow)
                return bet.amount * 2; // paye 2Xla mise
        }
        return 0; // perd la mise
    }
}
// src/index.ts
// Créer une nouvelle roulette
const roulette = new Roulette();
// Exemple de mises du joueur
const bets = [
    { type: "number", value: 7, amount: 5 },
    { type: "color", value: "red", amount: 10 },
    { type: "evenOdd", value: "odd", amount: 10 },
    { type: "highLow", value: "low", amount: 20 },
];
// Filtrer seulement les mises valides
const validBets = bets.filter((bet) => {
    const isValid = BetValidator.validate(bet);
    if (!isValid) {
        console.log(`❌ Mise invalide :`, bet);
    }
    return isValid;
});
// Lancer la roulette
const result = roulette.spin();
console.log("\n🎲 Résultat du spin :");
console.log(`Nombre : ${result.number}`);
console.log(`Couleur : ${result.color}`);
console.log(`Pair ? ${result.isEven}, Impair ? ${result.isOdd}`);
console.log(`Low ? ${result.isLow}, High ? ${result.isHigh}`);
// Calculer les gains
let totalPayout = 0;
for (const bet of validBets) {
    const payout = BetValidator.getPayout(bet, result);
    console.log(`👉 Mise sur ${bet.type} (${bet.value}) avec ${bet.amount}€ → Gain : ${payout}€`);
    totalPayout += payout;
}
console.log(`\n💰 Total des gains : ${totalPayout}€`);
//# sourceMappingURL=fichier.js.map