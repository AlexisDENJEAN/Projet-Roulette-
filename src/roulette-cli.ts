// roulette-cli.ts
const readline = require("readline");
// Définition des types de paris possibles
type BetType = "number" | "red" | "black" | "even" | "odd";

// Structure d'un pari
interface Bet {
  type: BetType;
  value?: number | undefined; // utilisé seulement si le type = "number"
  amount: number;
}

class Roulette {
   // Liste des numéros possibles (0 à 36)
  private numbers: number[] = Array.from({ length: 37 }, (_, i) => i);
  // Définition des numéros rouges
  private redNumbers = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18,
    19, 21, 23, 25, 27, 30, 32, 34, 36
  ]);
  // Définition des numéros noirs
  private blackNumbers = new Set([
    2, 4, 6, 8, 10, 11, 13, 15, 17,
    20, 22, 24, 26, 28, 29, 31, 33, 35
  ]);
// Méthode qui simule un lancer de roulette
  spin(bet: Bet): { result: number; win: boolean; payout: number } {
      const index = Math.floor(Math.random() * this.numbers.length);
      const result: number = this.numbers[index]!;
        // Par défaut : pas gagné et gain = 0
      let win = false;
      let payout = 0;
  // Vérifie le type de pari et calcule le gain si le joueur gagne
      switch (bet.type) {
        case "number":// pari sur un numéro précis
          if (bet.value !== undefined && bet.value === result) {
            win = true;
            payout = bet.amount * 35;// gain x35
          }
          break;
        case "red":
          if (this.redNumbers.has(result)) {
            win = true;
            payout = bet.amount * 2;// gain x2
          }
          break;
        case "black":
          if (this.blackNumbers.has(result)) {
            win = true;
            payout = bet.amount * 2;// gain x2
          }
          break;
        case "even":
          if (result !== 0 && result % 2 === 0) {
            win = true;
            payout = bet.amount * 2;// gain x2
          }
          break;
        case "odd":
          if (result % 2 === 1) {
            win = true;
            payout = bet.amount * 2;// gain x2
          }
          break;
      }
  // Retourne le résultat du spin
      return { result, win, payout };
    }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// Création d'une nouvelle partie
const game = new Roulette();

function askQuestion(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}
// Accueil et boucle de jeu
async function play() {
  console.log("🎰 Bienvenue à la Roulette ! Un paradis proche de l'enfer");
  // Demande du type de pari
  const type = await askQuestion(
    "Choisis ton pari (number, red, black, even, odd) : "
  );
// Si pari = "number", demander le numéro choisi
  let value: number | undefined;
  if (type === "number") {
    const v = await askQuestion("Sur quel numéro (0-36) ? ");
    value = parseInt(v);
  }
// Demande du montant misé
  const amount = parseInt(await askQuestion("Combien veux-tu miser ? "));
 // Création de l'objet "pari"
  const bet: Bet = {
    type: type as BetType,
    value,
    amount
  };
// Lancer la roulette et obtenir le résultat
  const outcome = game.spin(bet);
  console.log(`La bille s'arrête sur 🎲 ${outcome.result}`);
 // Affiche si le joueur a gagné ou perdu
  if (outcome.win) {
    console.log(`✅ Gagné ! Tu remportes ${outcome.payout} `);
  } else {
    console.log("❌ Perdu !");
  }
 // Propose de rejouer
  const again = await askQuestion("Veux-tu miser à nouveau ? (o/n) ");
  if (again.toLowerCase() === "o") {
    play();
  } else {
    console.log("Faut pas lâcher revient");
    rl.close();
  }
}
// Lancement du jeu
play();
