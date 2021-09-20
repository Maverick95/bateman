import { Brand } from './Brand';

interface Node {
    id: string,
    description: string,
    includedBy?: string[],
    excludedBy?: string[],
}

export interface ClothingItem extends Node {
    plural: boolean,
    brands: Brand[],
}

export interface ClothingCategory extends Node {
    mandatory: boolean,
    items: ClothingItem[],
}

export type ClothingOutfit = ClothingCategory[];
