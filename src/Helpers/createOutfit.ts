import { flow } from 'lodash';
import { flatten, flattenDeep, groupBy, map, min, orderBy, toPairs } from "lodash/fp";
import { Brand } from '../Models/Brand';
import { ClothingCategory, ClothingItem, ClothingOutfit } from '../Models/Clothing';

/* Data types for creating outfits. */

interface CreateOutfitCategory {
    id: string,
    score: number,
    included: boolean,
    excluded: boolean,
    processed: boolean,
}

interface CreateOutfitItem {
    id: string,
    category_id: string,
    score: number,
    included: boolean,
    excluded: boolean,
}

interface CreateOutfitRule {
    cause: string,
    effect: string,
}

interface CreateOutfitChosenItem {
  description: string;
  brand: Brand;
  order: number;
}

export interface CreateOutfitData {

    categories: CreateOutfitCategory[],
    items: CreateOutfitItem[],
    includes: CreateOutfitRule[],
    excludes: CreateOutfitRule[],

}

/* Process raw data. */

export const getCreateOutfitData = (outfit: ClothingOutfit): CreateOutfitData => {

    // Categories

    const categories = flow([

        map<ClothingCategory, CreateOutfitCategory>(
            (category) => ({
                id: category.id,
                score: category.score(),
                included: (category.includedBy?.length ?? 0) === 0,
                excluded: false,
                processed: false,
            })),

        orderBy(['score'], ['desc']),

    ])(outfit);

    // Items

    const items = flow([

        map<ClothingCategory, CreateOutfitItem[]>(
            (category) => category.items.map(
                (item) => ({
                    id: item.id,
                    category_id: category.id,
                    score: item.score(),
                    included: (item.includedBy?.length ?? 0) === 0,
                    excluded: false,
                }))),

        flatten,

        orderBy(['score'], ['desc']),

    ])(outfit);

    // Includes

    const includes_category = flow([

        map<ClothingCategory, CreateOutfitRule[]>(
            (category) => category.includedBy?.map(
                (included) => ({
                    cause: included,
                    effect: category.id
                })) ?? []),

        flatten,

    ])(outfit);

    const includes_item = flow([

        map<ClothingCategory, ClothingItem[]>(
            (category) => category.items),

        flatten,

        map<ClothingItem, CreateOutfitRule[]>(
            (item) => item.includedBy?.map(
                (included) => ({
                    cause: included,
                    effect: item.id
                })) ?? []),

        flatten,

    ])(outfit);

    const includes = [...includes_category, ...includes_item];

    // Excludes

    const excludes_category = flow([

        map<ClothingCategory, CreateOutfitRule[][]>(
            (category) => category.excludedBy?.map(
                (excluded) => ([
                    { cause: excluded, effect: category.id },
                    { cause: category.id, effect: excluded },
                ])) ?? []),

        flattenDeep,

    ])(outfit);

    const excludes_item = flow([

        map<ClothingCategory, ClothingItem[]>(
            (category) => category.items),

        flatten,

        map<ClothingItem, CreateOutfitRule[][]>(
            (item) => item.excludedBy?.map(
                (excluded) => ([
                    { cause: excluded, effect: item.id },
                    { cause: item.id, effect: excluded },
                ])) ?? []),

        flattenDeep,

    ])(outfit);

    const excludes = [...excludes_category, ...excludes_item ];

    return {
        categories,
        items,
        includes,
        excludes
    };
};

/* Loop criterion function of main process. */

const getNextCreateOutfitCategory = (data: CreateOutfitData): CreateOutfitCategory => data.categories.find(
    (category) => !category.processed && category.included && !category.excluded) ?? null;

/* Extract original data from store. */

const getClothingData = (outfit: ClothingOutfit, category_id: string, item_id: string): [ClothingCategory, ClothingItem] => {
    const category = outfit.find((category) => category.id === category_id) ?? null;
    const item = category?.items.find((item) => item.id === item_id) ?? null;
    return [category, item];
};

/* Convert original data into intermediate form for processing to final output. */

export const getCreateOutfitChosenItem = (category: ClothingCategory, item: ClothingItem) : CreateOutfitChosenItem => ({
    description: `${item.plural ? '' : 'a '}${item.description}`,
    brand: item.brands[Math.floor(Math.random() * (item.brands.length - 1))],
    order: category.order,
});

export const getOutputFromChosenItems = (items: CreateOutfitChosenItem[]): string => {

    interface CreateOutfitBrandGroup {
        brand: Brand,
        order: number,
        length: number,
        description: string,
    }

    const getSeparatorList = function<T>(value: T, index: number, collection: T[]): string {
        if (index === collection.length - 1) {
            return '';
        }
        if (index === collection.length - 2) {
            return ' and ';
        }
        return ', ';
    };

    const getSeparatorListOfBrandGroups = (value: CreateOutfitBrandGroup, index: number, collection: CreateOutfitBrandGroup[]): string => {
        if (index === collection.length - 1) {
            return '';
        }
        if (index === collection.length - 2) {
            return `${value.length > 1 ? ',' : ''} and `;
        }
        return ', ';
    };

    const getSeparatorDescriptionsToBrand = (length: number): string => {
        if (length === 1) {
            return ' by ';
        }
        if (length === 2) {
            return ', both by ';
        }
        return ', all by ';
    };

    const groups = flow([

        groupBy<CreateOutfitChosenItem>((item) => item.brand),

        toPairs,

        map<[Brand, CreateOutfitChosenItem[]], CreateOutfitBrandGroup>(
            (pairs) => {
                const [key, grouped] = pairs;
                return {
                    brand: key,
                    order: flow([
                        map<CreateOutfitChosenItem, number>((item) => item.order),
                        min,
                    ])(grouped),
                    length: grouped.length,
                    description: grouped.map(
                        (value, index, collection) =>
                        `${value.description}${getSeparatorList(value, index, collection)}`)
                    .join(''),
                };
            }),

        orderBy(['order'], ['asc']),

    ])(items);

    const result = groups.map(
        (value, index, collection) =>
            `${
            value.description}${
            getSeparatorDescriptionsToBrand(value.length)}${
            value.brand}${
            getSeparatorListOfBrandGroups(value, index, collection)}`).join('');

    return result;

}

/* Main algorithm - combines all of the above functions. */

export const createOutfit = (outfit: ClothingOutfit): string => {

    const chosen_items: CreateOutfitChosenItem[] = [];

    const data = getCreateOutfitData(outfit);

    for (
        var category = getNextCreateOutfitCategory(data);
        category !== null;
        category = getNextCreateOutfitCategory(data)) {
            
            const item = data.items.find((item) =>
            item.category_id === category.id &&
            item.included &&
            !item.excluded) ?? null;

        if (item !== null) {

            const [clothingCategory, clothingItem] = getClothingData(outfit, category.id, item.id);
            const outfitChosenItem = getCreateOutfitChosenItem(clothingCategory, clothingItem);

            chosen_items.push(outfitChosenItem);

            data.includes.filter((include) =>
                [category.id, item.id].includes(include.cause))
            .forEach((include) => {

                data.categories.filter((category) =>
                    category.id === include.effect)
                .forEach((category) => { category.included = true; });

                data.items.filter((item) => 
                    item.id === include.effect)
                .forEach((item) => { item.included = true; });
            
            });

            data.excludes.filter((exclude) =>
                [category.id, item.id].includes(exclude.cause))
            .forEach((exclude) => {

                data.categories.filter((category) =>
                    category.id === exclude.effect)
                .forEach((category) => { category.excluded = true; });

                data.items.filter((item) =>
                    item.id === exclude.effect)
                .forEach((item) => { item.excluded = true; });
            
            });

        }

        category.processed = true;

    }

    const result = getOutputFromChosenItems(chosen_items);

    return result;

};
