import { ClothingNode, ClothingOutfit } from '../Models/Clothing';

interface CreateOutfitCategory {
    id: string,
    score: number,
    included: boolean,
    excluded: boolean,
    processed: boolean,
}

interface CreateOutfitItem {
    id: string,
    output: string,
    category_id: string,
    score: number,
    included: boolean,
    excluded: boolean,
}

interface CreateOutfitRule {
    cause: string,
    effect: string,
}

export interface CreateOutfitData {

    categories: CreateOutfitCategory[],
    items: CreateOutfitItem[],
    includes: CreateOutfitRule[],
    excludes: CreateOutfitRule[],

}

export const getClothingNode = (outfit: ClothingOutfit, id: string): ClothingNode => {

    outfit.forEach((category) => {
        if (category.id === id) {
            return category;
        }
        category.items.forEach((item) => {
            if (item.id === id) {
                return item;
            }
        });
    });

    return null;
};

const getNextOutfitCategory = (data: CreateOutfitData): CreateOutfitCategory => data.categories.find(
    (category) => !category.processed && category.included && !category.excluded) ?? null;

export const createOutfit = (outfit: ClothingOutfit): string => {

    const outputs: string[] = [];

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

    IDEA NUMBER 2 -

    NOTE - to make everything easier, at the start it may be best to convert category-level includes/excludes
    to item-level includes/excludes

    It might make the general algorithm easier.

    Inclusions / exclusions between categories and items are not linked!
    Translation, just because a category is flagged as included/excluded doesn't mean all the sub-items are,
    this is actually incorrect logic.

    e.g. the inclusion of a particular item can be governed by a separate rule than the inclusion of the category.
    
    */

    for (
        var category = getNextOutfitCategory(data);
        category !== null;
        category = getNextOutfitCategory(data)) {
            
            const item = data.items.find((item) =>
            item.category_id === category.id &&
            item.included &&
            !item.excluded) ?? null;

        if (item !== null) {

            outputs.push(item.output);

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

    const result =
        outputs.map((output, index, result) => {
            if (index === result.length - 1) {
                return output;
            }
            if (index === result.length - 2) {
                return `${output} and `;
            }
            return `${output}, `;
        }).join('');

    return result;

};

export const generateProcessData = (outfit: ClothingOutfit): CreateOutfitData => {

    // Categories

    const categories = outfit.map<CreateOutfitCategory>(
        (category) => ({
            id: category.id,
            score: category.score(),
            included: (category.includedBy?.length ?? 0) === 0,
            excluded: false,
            processed: false,
        })).sort((a, b) => b.score - a.score);

    // Items

    const items = outfit.reduce<CreateOutfitItem[]>((previous, current) => [
        ...previous,
        ...current.items.map((item) => ({
            id: item.id,
            output: `${item.plural ? '' : 'a '}${item.description}`,
            category_id: current.id,
            score: item.score(),
            included: (item.includedBy?.length ?? 0) === 0,
            excluded: false,
        }))
    ], []).sort((a, b) => b.score - a.score);

    // Includes

    const includes_category = outfit.reduce<CreateOutfitRule[]>((previous, current) => [
        ...previous,
        ...(current.includedBy?.map((included) => ({
            cause: included,
            effect: current.id
        })) ?? [])
    ], []);

    const includes_item = outfit.reduce<CreateOutfitRule[]>((previous, current) => [
        ...previous,
        ...current.items.reduce<CreateOutfitRule[]>((previousItem, currentItem) => [
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

    const excludes_category = outfit.reduce<CreateOutfitRule[]>((previous, current) => [
        ...previous,
        ...(current.excludedBy?.map((excluded) => ({
            cause: excluded,
            effect: current.id
        })) ?? [])
    ], []);

    const excludes_item = outfit.reduce<CreateOutfitRule[]>((previous, current) => [
        ...previous,
        ...current.items.reduce<CreateOutfitRule[]>((previousItem, currentItem) => [
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
