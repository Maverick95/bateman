import * as _ from 'lodash';
import { Brand } from '../Models/Brand';
import { ClothingCategory, ClothingItem, ClothingOutfit } from '../Models/Clothing';

/* Base data types for generating outfits. */

interface OutfitCategory {
    id: string,
    score: number,
    included: boolean,
    excluded: boolean,
    processed: boolean,
}

interface OutfitItem {
    id: string,
    category_id: string,
    score: number,
    included: boolean,
    excluded: boolean,
}

interface OutfitRule {
    cause: string,
    effect: string,
}

/* Interim data types used during processing. */

interface OutfitChosenItem {

  // Fill in the types here you require for interim output production.
  // Unbranded description of outfit.
  // The brand.
  // The order (pulled from the category)

  description: string;
  brand: Brand;
  order: number;

}

export interface OutfitData {

    categories: OutfitCategory[],
    items: OutfitItem[],
    includes: OutfitRule[],
    excludes: OutfitRule[],

}

export const createOutfitChosenItem = (
    clothingCategory: ClothingCategory,
    outfitCategory: OutfitCategory,
    clothingItem: ClothingItem,
    outfitItem: OutfitItem) : OutfitChosenItem => {

    const brand_index: number = Math.floor(Math.random() * (clothingItem.brands.length - 1));
    return {
        description: `${clothingItem.plural ? '' : 'a '}${clothingItem.description}`,
        brand: clothingItem.brands[brand_index],
        order: clothingCategory.order,
    }
};

export const getClothingItem = (outfit: ClothingOutfit, id: string): ClothingItem => {

    for (let i:number = 0; i < outfit.length; i++) {
        for (let j:number = 0; j < outfit[i].items.length; j++) {
            if (outfit[i].items[j].id === id) {
                return outfit[i].items[j];
            }
        }
    }

    return null;
};

export const getClothingCategory = (outfit: ClothingOutfit, id: string): ClothingCategory =>
    outfit.find((category) => category.id === id) ?? null;

export const getOutputFromChosenItems = (items: OutfitChosenItem[]): string => {

    // Here is where the fun is!
    // Lodash may come in handy here.
    // You need to..
    // a) group by the brand,
    // b) order by the minimum order value,
    // c) within the category, combine the descriptions, append the brand on the end

    const groups = _.toPairs(_.groupBy(items, (item) => item.brand));

    const aggr_groups = _.map(groups, (pairs) => {
        const [key, groupedItems] = pairs;
        return ({
            brand: key,
            order: _.min(groupedItems.map((item) => item.order)),
            length: groupedItems.length,
            description: _.orderBy(groupedItems, (item) => item.order)
                .map((item, index, array) =>
                `${item.description}${((i: number, a: OutfitChosenItem[]) => {
                    if (i === a.length - 1) {
                        return '';
                    }
                    if (i === a.length - 2) {
                        return ' and ';
                    }
                    return ', ';
                })(index, array)}`).join(''),
        })
    });

    const display_aggr_groups =
        _.orderBy(aggr_groups, (aggr) => aggr.order)
        .map((aggr, index, array) => `${aggr.description}${
            ((b: string, l: number) => {
                if (l === 1) {
                    return ` by ${b}`;
                }
                if (l === 2) {
                    return `, both by ${b}`;
                }
                return `, all by ${b}`;
            })(aggr.brand, aggr.length)}${
                (
                (
                    v: { brand: string; order: number; length: number; description: string; },
                    i: number,
                    a: { brand: string; order: number; length: number; description: string; }[]
                ) => {
                    if (i === a.length - 1) {
                        return '';
                    }
                    if (i === a.length - 2) {
                        return `${v.length > 1 ? ',' : ''} and `;
                    }
                    return ', ';
                })(aggr, index, array)}`).join('');

    return display_aggr_groups;

}

const getNextOutfitCategory = (data: OutfitData): OutfitCategory => data.categories.find(
    (category) => !category.processed && category.included && !category.excluded) ?? null;

export const createOutfit = (outfit: ClothingOutfit): string => {

    const chosen_items: OutfitChosenItem[] = [];

    const data = generateProcessData(outfit);

    /*
    "the enforcement of a rule indicates that it's CAUSE is a fixed decision that cannot be overridden
    by any further consequence of the rule being enforced"

    All rules have a CAUSE and an EFFECT. However an exclusion rule actually states, "these two things cannot coexist".

    For example, loafers are excluded by a suit with trousers.

    A = suit with trousers
    B = loafers

    A => ~B (suit with trousers implies no loafers allowed)
    <=>
    B => ~A (loafers implies no suit with trousers allowed)

    This is why categories are scored, it gives priority to exclusion rules.

    However the statement of an exclusion rule can work both ways, based on which is chosen first.

    Inclusions / exclusions between categories and items are not linked!
    Translation, just because a category is flagged as included/excluded doesn't mean all the sub-items are,
    this is actually incorrect logic.

    e.g. the inclusion of a particular item can be governed by a separate rule than the inclusion of the category.
    
    */

    // Beginning here, need to abstract better the process for producing results.


    for (
        var category = getNextOutfitCategory(data);
        category !== null;
        category = getNextOutfitCategory(data)) {
            
            const item = data.items.find((item) =>
            item.category_id === category.id &&
            item.included &&
            !item.excluded) ?? null;

        if (item !== null) {

            const clothingCategory = getClothingCategory(outfit, category.id);
            const clothingItem = getClothingItem(outfit, item.id);

            const outfitChosenItem = createOutfitChosenItem(
                clothingCategory,
                category,
                clothingItem,
                item,
            )

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

        // Marked as processed.

        category.processed = true;

    }

    const result = getOutputFromChosenItems(chosen_items);

    return result;

};

export const generateProcessData = (outfit: ClothingOutfit): OutfitData => {

    // Categories

    const categories = outfit.map<OutfitCategory>(
        (category) => ({
            id: category.id,
            score: category.score(),
            included: (category.includedBy?.length ?? 0) === 0,
            excluded: false,
            processed: false,
        })).sort((a, b) => b.score - a.score);

    // Items

    const items = outfit.reduce<OutfitItem[]>((previous, current) => [
        ...previous,
        ...current.items.map((item) => ({
            id: item.id,
            category_id: current.id,
            score: item.score(),
            included: (item.includedBy?.length ?? 0) === 0,
            excluded: false,
        }))
    ], []).sort((a, b) => b.score - a.score);

    // Includes

    const includes_category = outfit.reduce<OutfitRule[]>((previous, current) => [
        ...previous,
        ...(current.includedBy?.map((included) => ({
            cause: included,
            effect: current.id
        })) ?? [])
    ], []);

    const includes_item = outfit.reduce<OutfitRule[]>((previous, current) => [
        ...previous,
        ...current.items.reduce<OutfitRule[]>((previousItem, currentItem) => [
            ...previousItem,
            ...currentItem.includedBy?.map(
                (included) => ({
                    cause: included,
                    effect: currentItem.id
                })) ?? []
        ], [])
    ], []);

    const includes = [...includes_category, ...includes_item];

    // Excludes

    const excludes_category = outfit.reduce<OutfitRule[]>((previous, current) => [
        ...previous,
        ...(current.excludedBy?.map((excluded) => ({
            cause: excluded,
            effect: current.id
        })) ?? [])
    ], []);

    const excludes_item = outfit.reduce<OutfitRule[]>((previous, current) => [
        ...previous,
        ...current.items.reduce<OutfitRule[]>((previousItem, currentItem) => [
            ...previousItem,
            ...currentItem.excludedBy?.map(
                (excluded) => ({
                    cause: excluded,
                    effect: currentItem.id
                })) ?? []
        ], [])
    ], []);

    const excludes = [
        ...excludes_category,
        ...excludes_item,
        ...excludes_category.map((exclude) => (
            {
                cause: exclude.effect,
                effect: exclude.cause
            })),
        ...excludes_item.map((exclude) => (
            {
                cause: exclude.effect,
                effect: exclude.cause
            })),
    ];

    return {
        categories,
        items,
        includes,
        excludes
    };

};
