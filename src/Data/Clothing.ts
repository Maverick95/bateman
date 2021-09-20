import { Brand } from '../Models/Brand';
import { ClothingOutfit } from '../Models/Clothing';

export const Clothing: ClothingOutfit = [

    // Eyewear

    {
        id: 'eyewear',
        description: 'eyewear',
        mandatory: false,

        items: [
            {
                id: 'eyeglasses',
                description: 'eyeglasses',
                plural: true,
                brands: [],
            }
        ]
    },

    // Wristwear

    {
        id: 'wristwear',
        description: 'wristwear',
        mandatory: false,

        items: [
            {
                id: 'watch',
                description: 'watch',
                plural: false,
                brands: [],
            }
        ]
    },

    // On chest

    {
        id: 'on_chest',
        description: 'on_chest',
        mandatory: true,

        items: [
            {
                id: 'shirt',
                description: 'shirt',
                plural: false,
                brands: [],
            },
            {
                id: 't_shirt',
                description: 't_shirt',
                plural: false,
                excludedBy: [ 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands: [],
            }
        ]
    },

    // Over chest 1

    {
        id: 'over_chest_1',
        description: 'over_chest_1',
        mandatory: false,

        items: [
            {
                id: 'waistcoat',
                description: 'waistcoat',
                plural: false,
                includedBy: [ 'shirt' ],
                brands: [],
            },
            {
                id: 'sweater_vest',
                description: 'sweater_vest',
                plural: false,
                excludedBy: [ 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands: [],
            },
            {
                id: 'sweater',
                description: 'sweater',
                plural: false,
                excludedBy: [ 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands: [],
            }
        ]
    },

    // Neckwear

    {
        id: 'neckwear',
        description: 'neckwear',
        mandatory: true,
        includedBy: [ 'shirt' ],

        items: [
            {
                id: 'tie',
                description: 'tie',
                plural: false,
                brands: [],
            },
            {
                id: 'bow_tie',
                description: 'bow_tie',
                plural: false,
                brands: [],
            }
        ]
    },

    // Over chest 2

    {
        id: 'over_chest_2',
        description: 'over_chest_2',
        mandatory: false,

        items: [
            {
                id: 'suit',
                description: 'suit',
                plural: false,
                brands: [],
            },
            {
                id: 'suit_with_trousers',
                description: 'suit_with_trousers',
                plural: false,
                brands: [],
            },
            {
                id: 'blazer',
                description: 'blazer',
                plural: false,
                brands: [],
            },
            {
                id: 'sport_coat',
                description: 'sport_coat',
                plural: false,
                brands: [],
            },
            {
                id: 'tuxedo',
                description: 'tuxedo',
                plural: false,
                brands: [],
            },
            {
                id: 'tuxedo_with_trousers',
                description: 'tuxedo_with_trousers',
                plural: false,
                brands: [],
            },
            {
                id: 'jacket',
                description: 'jacket',
                plural: false,
                brands: [],
            },
            {
                id: 'dinner_jacket',
                description: 'dinner_jacket',
                plural: false,
                brands: [],
            },
        ]
    },

    // In the pocket

    {
        id: 'in_the_pocket',
        description: 'in_the_pocket',
        mandatory: false,
        includedBy: [ 'over_chest_2' ],
        
        items: [
            {
                id: 'handkerchief',
                description: 'handkerchief',
                plural: false,
                brands: [],
            },
            {
                id: 'pocket_square',
                description: 'pocket_square',
                plural: false,
                brands: [],
            }
        ]
    },

    // Outer coat

    {
        id: 'outer_coat',
        description: 'outer_coat',
        mandatory: false,

        items: [
            {
                id: 'coat',
                description: 'coat',
                plural: false,
                brands: [],
            },
            {
                id: 'topcoat',
                description: 'topcoat',
                plural: false,
                brands: [],
            },
            {
                id: 'overcoat',
                description: 'overcoat',
                plural: false,
                brands: [],
            }
        ]
    },

    // Legwear

    {
        id: 'legwear',
        description: 'legwear',
        mandatory: true,
        excludedBy: [ 'suit_with_trousers', 'tuxedo_with_trousers' ],

        items: [
            {
                id: 'trousers',
                description: 'trousers',
                plural: true,
                brands: [],
            },
            {
                id: 'corduroys',
                description: 'corduroys',
                plural: true,
                brands: [],
            },
            {
                id: 'slacks',
                description: 'slacks',
                plural: true,
                brands: [],
            },
        ]
    },

    // Waistwear

    {
        id: 'waistwear',
        description: 'waistwear',
        mandatory: true,

        items: [
            {
                id: 'belt',
                description: 'belt',
                plural: false,
                brands: [],
            }
        ]
    },

    // Anklewear

    {
        id: 'anklewear',
        description: 'anklewear',
        mandatory: true,

        items: [
            {
                id: 'socks',
                description: 'socks',
                plural: true,
                brands: [],
            }
        ]
    },

    // Footwear

    {
        id: 'footwear',
        description: 'footwear',
        mandatory: true,

        items: [
            {
                id: 'wing_tips',
                description: 'wing_tips',
                plural: true,
                brands:[],
            },
            {
                id: 'lace_ups',
                description: 'lace_ups',
                plural: true,
                brands:[],
            },
            
            {
                id: 'shoes',
                description: 'shoes',
                plural: true,
                brands:[],
            },
            
            {
                id: 'loafers',
                description: 'loafers',
                plural: true,
                excludedBy: [ 'suit', 'suit_with_trousers', 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands:[],
            },
            
            {
                id: 'pumps',
                description: 'pumps',
                plural: true,
                excludedBy: [ 'suit', 'suit_with_trousers', 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands:[],
            },
            
            {
                id: 'moccasins',
                description: 'moccasins',
                plural: true,
                excludedBy: [ 'suit', 'suit_with_trousers', 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands:[],
            },
            
            {
                id: 'slip_ons',
                description: 'slip_ons',
                plural: true,
                excludedBy: [ 'suit', 'suit_with_trousers', 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands:[],
            },
        ]
    }

];
