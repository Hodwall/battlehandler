export const diceRoll = (sides: number) => {
    return Math.floor(Math.random() * sides + 1);
};
