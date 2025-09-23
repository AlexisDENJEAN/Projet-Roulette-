// roulette-cli.ts
const readline = require("readline");

type BetType = "number" | "red" | "black" | "even" | "odd";

interface Bet {
  type: BetType;
  value?: number | undefined; 
  amount: number;
}

class Roulette {
  private numbers: number[] = Array.from({ length: 37 }, (_, i) => i);
  private redNumbers = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18,
    19, 21, 23, 25, 27, 30, 32, 34, 36
  ]);
  private blackNumbers = new Set([
    2, 4, 6, 8, 10, 11, 13, 15, 17,
    20, 22, 24, 26, 28, 29, 31, 33, 35
  ]);

  spin(bet: Bet): { result: number; win: boolean; payout: number } {
      const index = Math.floor(Math.random() * this.numbers.length);
      const result: number = this.numbers[index]!;
      let win = false;
      let payout = 0;
  
      switch (bet.type) {
        case "number":
          if (bet.value !== undefined && bet.value === result) {
            win = true;
            payout = bet.amount * 35;
          }
          break;
        case "red":
          if (this.redNumbers.has(result)) {
            win = true;
            payout = bet.amount * 2;
          }
          break;
        case "black":
          if (this.blackNumbers.has(result)) {
            win = true;
            payout = bet.amount * 2;
          }
          break;
        case "even":
          if (result !== 0 && result % 2 === 0) {
            win = true;
            payout = bet.amount * 2;
          }
          break;
        case "odd":
          if (result % 2 === 1) {
            win = true;
            payout = bet.amount * 2;
          }
          break;
      }
  
      return { result, win, payout };
    }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const game = new Roulette();

function askQuestion(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

async function play() {
  console.log("🎰 Bienvenue à la Roulette ! Un paradis proche de l'enfer");
  const type = await askQuestion(
    "Choisis ton pari (number, red, black, even, odd) : "
  );

  let value: number | undefined;
  if (type === "number") {
    const v = await askQuestion("Sur quel numéro (0-36) ? ");
    value = parseInt(v);
  }

  const amount = parseInt(await askQuestion("Combien veux-tu miser ? "));

  const bet: Bet = {
    type: type as BetType,
    value,
    amount
  };

  const outcome = game.spin(bet);
  console.log(`La bille s'arrête sur 🎲 ${outcome.result}`);

  if (outcome.win) {
    console.log(`✅ Gagné ! Tu remportes ${outcome.payout} `);
  } else {
    console.log("❌ Perdu !");
  }

  const again = await askQuestion("Veux-tu miser à nouveau ? (o/n) ");
  if (again.toLowerCase() === "o") {
    play();
  } else {
    console.log("Faut pas lâcher revient");
    rl.close();
  }
}

play();
