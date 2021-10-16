import { Brand } from './Brand';

export interface ClothingNode {
    id: string,
    description: string,
    score: GetScore,
    includedBy?: string[],
    excludedBy?: string[],
}

export type GetScore = () => number;

export interface ClothingItem extends ClothingNode {
    plural: boolean,
    brands: Brand[],
}

export interface ClothingCategory extends ClothingNode {
    mandatory: boolean,
    order: number,
    items: ClothingItem[],
}

export type ClothingOutfit = ClothingCategory[];

