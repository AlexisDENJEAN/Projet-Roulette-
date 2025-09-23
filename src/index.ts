 import { Roulette } from './roulette';
 import { BetValidator } from './Bet';
import { bets } from './bets';

 const roulette = new Roulette();

const validBets = bets.filter((bet) => {
    const isValid = BetValidator.validate(bet);
    if (!isValid) {
        console.log('Mise invalide:', bet);
    } 
    return isValid;
});