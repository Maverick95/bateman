import { ClothingOutfit } from '../Models/Clothing';
import { OutfitData } from './createOutfit'; 

export const data_generateProcessData: { input: ClothingOutfit, expected: OutfitData }[] = [
    {
        input: [
            {
                id: 'category_1',
                description: 'category_1',
                mandatory: false,
                order: 1,
                score: () => 0.5,
                includedBy: [ 'item_4' ],
                items: [
                    {
                        id: 'item_1',
                        description: 'item_1',
                        plural: false,
                        score: () => 0.7,
                        brands: []
                    },
                    {
                        id: 'item_2',
                        description: 'item_2',
                        plural: false,
                        score: () => 0.6,
                        excludedBy: [ 'item_4' ],
                        brands: []
                    },
                ],
            },
            {
                id: 'category_2',
                description: 'category_2',
                mandatory: false,
                order: 2,
                score: () => 0.7,
                items: [
                    {
                        id: 'item_3',
                        description: 'item_3',
                        plural: false,
                        score: () => 0.3,
                        brands: []
                    },
                    {
                        id: 'item_4',
                        description: 'item_4',
                        plural: false,
                        score: () => 0.5,
                        brands: []
                    },
                ]
            }
        ],

        expected: {

            categories: [
                {
                    id: 'category_2',
                    score: 0.7,
                    included: true,
                    excluded: false,
                    processed: false,
                },
                {
                    id: 'category_1',
                    score: 0.5,
                    included: false,
                    excluded: false,
                    processed: false,
                }
            ],

            items: [
                {
                    id: 'item_1',
                    category_id: 'category_1',
                    score: 0.7,
                    included: true,
                    excluded: false
                },
                {
                    id: 'item_2',
                    category_id: 'category_1',
                    score: 0.6,
                    included: true,
                    excluded: false
                },
                {
                    id: 'item_4',
                    category_id: 'category_2',
                    score: 0.5,
                    included: true,
                    excluded: false
                },
                {
                    id: 'item_3',
                    category_id: 'category_2',
                    score: 0.3,
                    included: true,
                    excluded: false
                }
            ],

            includes: [
                { cause: 'item_4', effect: 'category_1' }
            ],

            excludes: [
                { cause: 'item_4', effect: 'item_2' },
                { cause: 'item_2', effect: 'item_4' },
            ]
        }
    }
];
