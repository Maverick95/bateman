import { ClothingNode, ClothingOutfit } from '../Models/Clothing';

interface CreateOutfitCategory {
    id: string,
    score: number,
    included: boolean,
    excluded: boolean,
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

interface CreateOutfitData {
    
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


export const generateProcessData = (outfit: ClothingOutfit): CreateOutfitData => {

    /*

    Assumption / axiom -
    "the enforcement of a rule indicates that it's CAUSE is a fixed decision that cannot be overridden
    by any further consequence of the rule being enforced"

    All rules have a CAUSE and an EFFECT.

    AAAND here is a key idea - is there such a thing as a CAUSE and an EFFECT?
    Or are you just saying, "these two things cannot coexist"?

    For example, loafers are excluded by a suit with trousers.

    A = suit with trousers
    B = loafers

    A => ~B <=> B => ~A

    Yes, you are saying "these things cannot co-exist".
    The exclusion property on its own therefore gives power to the item being the excludor.
    You are technically just providing pairs that can't co-exist, but you NEED to provide a priority.
    i.e. which one wins out?

    Wait, can't you do this by the scores?
    Can't the scores be overall as well as within each category?
    Or, could you have a category score and then an item score?
    The category score determines the order in which categories are chosen.
    Inclusion / exclusion rules are applied this way.
    And you have to keep in mind that exclusion rules are a two-way thing.

    IDEA NUMBER 2 -

    I'm getting exhausted just trying to write this out now

    a) determine the catgories / items that are included at the start,
    this is basically all categories / items without an included array

    b) give ALL categories / items a ranked score based on their function,

    c) choose the first valid category / item based on score, this category is now FIXED,
    elaborate on this a bit further,
    what if you cannot pick an item from the category?
    depends on the reason,
    1) all are excluded, then this category is dud,
    2) none are included, you need to keep coming back to this
    
    d) use the category / item include and exclude arrays to knock out or add in categories or items

    e) now pick the next category based on availability / score

    I think this is mostly there now.

    You'll need to store info at both category and item level.

    Category -
    id (from data)
    score (set at start by function)
    processedAlready (initialized to false)
    included (set at start based on whether includedBy props are present, update as you go)
    excluded (initialized to false)

    Item
    id (from data)
    category_id (from data)
    score (set at start by function)
    included (set at start based on whether includedBy props are present for category / item, update as you go)
    excluded (set at start to false, updated as you go)

    Includes
    array mapping id to id of category / item to include

    Excludes
    array mapping id to exclude
    this array contains a -> b and b -> a

    NOTE - to make everything easier, at the start it may be best to convert category-level includes/excludes
    to item-level includes/excludes

    It might make the general algorithm easier.
    
    */

    /* Set up initial data structures. */

    // Categories

    const categories = outfit.map<CreateOutfitCategory>(
        (category) => ({
            id: category.id,
            score: category.score(),
            included: (category.includedBy?.length ?? 0) === 0,
            excluded: false,
        }));

    // Items

    const items = outfit.reduce<CreateOutfitItem[]>((previous, current) => [
        ...previous,
        ...current.items.map((item) => ({
            id: item.id,
            category_id: current.id,
            score: item.score(),
            included: (current.includedBy?.length ?? 0) === 0 && (item.includedBy?.length ?? 0) === 0,
            excluded: false,
        }))
    ], []);

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

    const includes = [ ...includes_category, ...includes_item ];

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
