import { ClothingItem, GetScore } from '../Models/Clothing';

export const getScoreUniform = (lowerBound: number, upperBound: number, randomizer: () => number): GetScore =>
    () => {
        const random = randomizer();
        return (1 - random) * lowerBound + random * upperBound;
    };
