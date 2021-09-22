import { Brand } from '../Models/Brand';
import { ClothingOutfit } from '../Models/Clothing';
import { getScoreUniform } from '../Helpers/getScore';

export const Clothing: ClothingOutfit = [

    // Eyewear

    {
        id: 'eyewear',
        description: 'eyewear',
        mandatory: false,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'eyeglasses',
                description: 'eyeglasses',
                plural: true,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Wristwear

    {
        id: 'wristwear',
        description: 'wristwear',
        mandatory: false,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'watch',
                description: 'watch',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // On chest

    {
        id: 'on_chest',
        description: 'on_chest',
        mandatory: true,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'shirt',
                description: 'shirt',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 't_shirt',
                description: 't_shirt',
                plural: false,
                excludedBy: [ 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Over chest 1

    {
        id: 'over_chest_1',
        description: 'over_chest_1',
        mandatory: false,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'waistcoat',
                description: 'waistcoat',
                plural: false,
                includedBy: [ 'shirt' ],
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'sweater_vest',
                description: 'sweater_vest',
                plural: false,
                excludedBy: [ 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'sweater',
                description: 'sweater',
                plural: false,
                excludedBy: [ 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Neckwear

    {
        id: 'neckwear',
        description: 'neckwear',
        mandatory: true,
        includedBy: [ 'shirt' ],
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'tie',
                description: 'tie',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'bow_tie',
                description: 'bow_tie',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Over chest 2

    {
        id: 'over_chest_2',
        description: 'over_chest_2',
        mandatory: false,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'suit',
                description: 'suit',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'suit_with_trousers',
                description: 'suit_with_trousers',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'blazer',
                description: 'blazer',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'sport_coat',
                description: 'sport_coat',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'tuxedo',
                description: 'tuxedo',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'tuxedo_with_trousers',
                description: 'tuxedo_with_trousers',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'jacket',
                description: 'jacket',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'dinner_jacket',
                description: 'dinner_jacket',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
        ]
    },

    // In the pocket

    {
        id: 'in_the_pocket',
        description: 'in_the_pocket',
        mandatory: false,
        includedBy: [ 'over_chest_2' ],
        score: getScoreUniform(0, 1, Math.random),
        
        items: [
            {
                id: 'handkerchief',
                description: 'handkerchief',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'pocket_square',
                description: 'pocket_square',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Outer coat

    {
        id: 'outer_coat',
        description: 'outer_coat',
        mandatory: false,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'coat',
                description: 'coat',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'topcoat',
                description: 'topcoat',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'overcoat',
                description: 'overcoat',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Legwear

    {
        id: 'legwear',
        description: 'legwear',
        mandatory: true,
        excludedBy: [ 'suit_with_trousers', 'tuxedo_with_trousers' ],
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'trousers',
                description: 'trousers',
                plural: true,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'corduroys',
                description: 'corduroys',
                plural: true,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'slacks',
                description: 'slacks',
                plural: true,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            },
        ]
    },

    // Waistwear

    {
        id: 'waistwear',
        description: 'waistwear',
        mandatory: true,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'belt',
                description: 'belt',
                plural: false,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Anklewear

    {
        id: 'anklewear',
        description: 'anklewear',
        mandatory: true,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'socks',
                description: 'socks',
                plural: true,
                brands: [],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Footwear

    {
        id: 'footwear',
        description: 'footwear',
        mandatory: true,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'wing_tips',
                description: 'wing_tips',
                plural: true,
                brands:[],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'lace_ups',
                description: 'lace_ups',
                plural: true,
                brands:[],
                score: getScoreUniform(0, 1, Math.random),
            },
            
            {
                id: 'shoes',
                description: 'shoes',
                plural: true,
                brands:[],
                score: getScoreUniform(0, 1, Math.random),
            },
            
            {
                id: 'loafers',
                description: 'loafers',
                plural: true,
                excludedBy: [ 'suit', 'suit_with_trousers', 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands:[],
                score: getScoreUniform(0, 1, Math.random),
            },
            
            {
                id: 'pumps',
                description: 'pumps',
                plural: true,
                excludedBy: [ 'suit', 'suit_with_trousers', 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands:[],
                score: getScoreUniform(0, 1, Math.random),
            },
            
            {
                id: 'moccasins',
                description: 'moccasins',
                plural: true,
                excludedBy: [ 'suit', 'suit_with_trousers', 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands:[],
                score: getScoreUniform(0, 1, Math.random),
            },
            
            {
                id: 'slip_ons',
                description: 'slip_ons',
                plural: true,
                excludedBy: [ 'suit', 'suit_with_trousers', 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands:[],
                score: getScoreUniform(0, 1, Math.random),
            },
        ]
    }

];
