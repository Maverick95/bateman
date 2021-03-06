import { Brand } from '../Models/Brand';
import { ClothingOutfit } from '../Models/Clothing';
import { getScoreUniform } from '../Helpers/getScore';

export const Clothing: ClothingOutfit = [

    // Eyewear

    {
        id: 'eyewear',
        description: 'eyewear',
        mandatory: false,
        order: 12,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'eyeglasses',
                description: 'eyeglasses',
                plural: true,
                brands: [
                    Brand.OLIVER_PEOPLES,
                    Brand.LAFONT_PARIS,
                    Brand.BAUSCH_LOMB,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'sunglasses',
                description: 'sunglasses',
                plural: true,
                brands: [
                    Brand.RAY_BAN,
                ],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Wristwear

    {
        id: 'wristwear',
        description: 'wristwear',
        mandatory: false,
        order: 7,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'watch',
                description: 'watch',
                plural: false,
                brands: [
                    Brand.SAKS,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'chronograph',
                description: 'chronograph',
                plural: false,
                brands: [
                    Brand.BREIL,
                ],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // On chest

    {
        id: 'on_chest',
        description: 'on_chest',
        mandatory: true,
        order: 3,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'shirt',
                description: 'shirt',
                plural: false,
                brands: [
                    Brand.IKE_BEHAR,
                    Brand.VALENTINO_COUTURE,
                    Brand.GITMAN_BROTHERS,
                    Brand.BASILE,
                    Brand.CERRUTI_1881,
                    Brand.PAUL_SMITH,
                    Brand.RALPH_LAUREN,
                    Brand.PIERRE_CARDIN,
                    Brand.BILL_BLASS,
                    Brand.JOSEPH_ABBOUD,
                    Brand.CHARIVARI,
                    Brand.ALEXANDER_JULIAN,
                    Brand.GIORGIO_ARMANI,
                    Brand.BURBERRY,
                    Brand.PATRICK_AUBERT,
                    Brand.YVES_SAINT_LAURENT,
                    Brand.HUGO_BOSS,
                    Brand.POLO,
                    Brand.JOHN_REYLE,
                    Brand.RONALDUS_SHAMASK,
                    Brand.GIANNI_VERSACE,
                    Brand.CHRISTIAN_DIOR,
                    Brand.HERMES,
                    Brand.MATSUDA,
                    Brand.BROOKS_BROTHERS,
                    Brand.LUCIANO_BARBERA,
                    Brand.PERRY_ELLIS,
                    Brand.GIVENCHY,
                    Brand.COMME_DES_GARCONS_HOMME,
                    Brand.JOSEPH_ABBOUD,
                    Brand.BROOKS_BROTHERS,
                    Brand.ASCOT_CHANG,
                    Brand.LUCIANO_BARBERA,
                    Brand.CHARVET,
                    Brand.GARRICK_ANDERSON,
                    Brand.LOUIS_BOSTON,
                    Brand.BROOKS_BROTHERS,
                    Brand.HACKERT,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 't_shirt',
                description: 'T-shirt',
                plural: false,
                excludedBy: [ 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands: [
                    Brand.AGNES_B,
                ],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Over chest 1

    {
        id: 'over_chest_1',
        description: 'over_chest_1',
        mandatory: false,
        order: 4,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'waistcoat',
                description: 'waistcoat',
                plural: false,
                includedBy: [ 'shirt' ],
                brands: [
                    Brand.KILGOUR_FRENCH_STANBURY,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'sweater_vest',
                description: 'sweater vest',
                plural: false,
                excludedBy: [ 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands: [
                    Brand.GARRICK_ANDERSON,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'sweater',
                description: 'sweater',
                plural: false,
                excludedBy: [ 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands: [
                    Brand.PAUL_STUART,
                    Brand.GIORGIO_ARMANI,
                    Brand.HERMES,
                ],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Neckwear

    {
        id: 'neckwear',
        description: 'neckwear',
        mandatory: true,
        order: 5,
        includedBy: [ 'shirt' ],
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'tie',
                description: 'tie',
                plural: false,
                brands: [
                    Brand.RALPH_LAUREN,
                    Brand.BILL_BLASS,
                    Brand.VALENTINO_COUTURE,
                    Brand.JOSEPH_ABBOUD,
                    Brand.PERRY_ELLIS,
                    Brand.HUGO_BOSS,
                    Brand.BILL_BLASS_SIGNATURE,
                    Brand.PAUL_STUART,
                    Brand.GIORGIO_ARMANI,
                    Brand.RESIKEIO,
                    Brand.CLAIBORNE,
                    Brand.POLO,
                    Brand.JOHN_REYLE,
                    Brand.ZANZARRA,
                    Brand.GIANNI_VERSACE,
                    Brand.GIVENCHY_GENTLEMAN,
                    Brand.SAVOY,
                    Brand.HERMES,
                    Brand.MATSUDA,
                    Brand.ADIRONDACK,
                    Brand.LUCIANO_BARBERA,
                    Brand.GIVENCHY,
                    Brand.CHRISTIAN_DIOR,
                    Brand.JOSEPH_ABBOUD,
                    Brand.EUGENIO_VENANZI,
                    Brand.LOUIS_BOSTON,
                    Brand.GARRICK_ANDERSON,
                    Brand.DUNHILL,
                    Brand.BROOKS_BROTHERS,
                    Brand.ERMENEGILDO_ZEGNA,
                    Brand.RICHEL,
                    Brand.HERMES,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'bow_tie',
                description: 'bow tie',
                plural: false,
                brands: [
                    Brand.RAINBOW_NECKWEAR,
                    Brand.MARTIN_DINGMAN_NECKWEAR,
                    Brand.RALPH_LAUREN,
                    Brand.PIERRE_CARDIN,
                    Brand.SAKS,
                    Brand.HUGO_BOSS,
                    Brand.VALENTINO,
                ],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Over chest 2

    {
        id: 'over_chest_2',
        description: 'over_chest_2',
        mandatory: false,
        order: 2,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'suit',
                description: 'suit',
                plural: false,
                brands: [
                    Brand.ERMENEGILDO_ZEGNA,
                    Brand.CERRUTI_1881,
                    Brand.CANALI_MILANO,
                    Brand.VALENTINO_COUTURE,
                    Brand.CHAPS,
                    Brand.ALEXANDER_JULIAN,
                    Brand.HUGO_BOSS,
                    Brand.RALPH_LAUREN,
                    Brand.GIORGIO_CORREGGIARI,
                    Brand.BILL_ROBINSON,
                    Brand.GIORGIO_ARMANI,
                    Brand.LUBIAM,
                    Brand.CHRISTIAN_DIOR,
                    Brand.PATRICK_AUBERT,
                    Brand.YVES_SAINT_LAURENT,
                    Brand.POLO,
                    Brand.JOHN_REYLE,
                    Brand.GIANNI_VERSACE,
                    Brand.SCHOENEMAN,
                    Brand.KRIZIA_UOMO,
                    Brand.PERRY_ELLIS,
                    Brand.COURREGES,
                    Brand.GIVENCHY,
                    Brand.LUCIANO_SOPRANI,
                    Brand.JOSEPH_ABBOUD,
                    Brand.BROOKS_BROTHERS,
                    Brand.REDAELLI,
                    Brand.BELVEST,
                    Brand.GARRICK_ANDERSON,
                    Brand.GIAN_MARCO_VENTURI,
                    Brand.GIEVES_AND_HAWKES,
                    Brand.DERIGUEUR,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'suit_with_trousers',
                description: 'suit',
                plural: false,
                brands: [
                    Brand.ERMENEGILDO_ZEGNA,
                    Brand.CERRUTI_1881,
                    Brand.CANALI_MILANO,
                    Brand.VALENTINO_COUTURE,
                    Brand.CHAPS,
                    Brand.ALEXANDER_JULIAN,
                    Brand.HUGO_BOSS,
                    Brand.RALPH_LAUREN,
                    Brand.GIORGIO_CORREGGIARI,
                    Brand.BILL_ROBINSON,
                    Brand.GIORGIO_ARMANI,
                    Brand.LUBIAM,
                    Brand.CHRISTIAN_DIOR,
                    Brand.PATRICK_AUBERT,
                    Brand.YVES_SAINT_LAURENT,
                    Brand.POLO,
                    Brand.JOHN_REYLE,
                    Brand.GIANNI_VERSACE,
                    Brand.SCHOENEMAN,
                    Brand.LOUIS_BOSTON,
                    Brand.LUCIANO_SOPRANI,
                ],
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
                description: 'sport coat',
                plural: false,
                brands: [
                    Brand.ALEXANDER_JULIAN,
                    Brand.HERMES,
                    Brand.MATSUDA,
                    Brand.VALENTINO_COUTURE,
                    Brand.BROOKS_BROTHERS,
                    Brand.REDAELLI,
                    Brand.HERMES,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'tuxedo',
                description: 'tuxedo',
                plural: false,
                brands: [
                    Brand.RALPH_LAUREN,
                    Brand.PIERRE_CARDIN,
                    Brand.VALENTINO,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'tuxedo_with_trousers',
                description: 'tuxedo',
                plural: false,
                brands: [
                    Brand.RALPH_LAUREN,
                    Brand.PIERRE_CARDIN,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'jacket',
                description: 'jacket',
                plural: false,
                brands: [
                    Brand.BERGDORF_GODDMAN,
                    Brand.MARIO_VALENTINO,
                    Brand.GIORGIO_ARMANI,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'dinner_jacket',
                description: 'dinner jacket',
                plural: false,
                brands: [
                    Brand.HUGO_BOSS,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
        ]
    },

    // In the pocket

    {
        id: 'in_the_pocket',
        description: 'in_the_pocket',
        mandatory: false,
        order: 6,
        includedBy: [ 'over_chest_2' ],
        score: getScoreUniform(0, 1, Math.random),
        
        items: [
            {
                id: 'handkerchief',
                description: 'handkerchief',
                plural: false,
                brands: [
                    Brand.BROOKS_BROTHERS,
                    Brand.ASHEAR_BROS,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'pocket_square',
                description: 'pocket square',
                plural: false,
                brands: [
                    Brand.PATRICK_AUBERT,
                    Brand.POLO,
                    Brand.PAUL_STUART,
                    Brand.ASHEAR_BROS,
                    Brand.BROOKS_BROTHERS,
                ],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Outer coat

    {
        id: 'outer_coat',
        description: 'outer_coat',
        mandatory: false,
        order: 1,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'coat',
                description: 'coat',
                plural: false,
                brands: [
                    Brand.LUCIANO_SOPRANI,
                    Brand.PAUL_SMITH,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'topcoat',
                description: 'topcoat',
                plural: false,
                brands: [
                    Brand.GIORGIO_ARMANI,
                    Brand.VALENTINO_COUTURE,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'overcoat',
                description: 'overcoat',
                plural: false,
                brands: [
                    Brand.CROMBIE,
                    Brand.STUDIO_000_1,
                ],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Legwear

    {
        id: 'legwear',
        description: 'legwear',
        mandatory: true,
        order: 8,
        excludedBy: [ 'suit_with_trousers', 'tuxedo_with_trousers' ],
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'trousers',
                description: 'trousers',
                plural: true,
                brands: [
                    Brand.MARIO_VALENTINO,
                    Brand.LAZO,
                    Brand.ALEXANDER_JULIAN,
                    Brand.HUGO_BOSS,
                    Brand.GIORGIO_ARMANI,
                    Brand.HERMES,
                    Brand.MATSUDA,
                    Brand.RALPH_LAUREN,
                    Brand.VALENTINO_COUTURE,
                    Brand.KRIZIA_UOMO,
                    Brand.HERMES,
                    Brand.GARRICK_ANDERSON,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'corduroys',
                description: 'corduroys',
                plural: true,
                brands: [
                    Brand.RALPH_LAUREN,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'slacks',
                description: 'slacks',
                plural: true,
                brands: [
                    Brand.BROOKS_BROTHERS,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
        ]
    },

    // Waistwear

    {
        id: 'waistwear',
        description: 'waistwear',
        mandatory: true,
        order: 9,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'belt',
                description: 'belt',
                plural: false,
                brands: [
                    Brand.RALPH_LAUREN,
                    Brand.COACH_LEATHERWARE,
                ],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Anklewear

    {
        id: 'anklewear',
        description: 'anklewear',
        mandatory: true,
        order: 10,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'socks',
                description: 'socks',
                plural: true,
                brands: [
                    Brand.INTERWOVEN,
                    Brand.E_G_SMITH,
                ],
                score: getScoreUniform(0, 1, Math.random),
            }
        ]
    },

    // Footwear

    {
        id: 'footwear',
        description: 'footwear',
        mandatory: true,
        order: 11,
        score: getScoreUniform(0, 1, Math.random),

        items: [
            {
                id: 'wing_tips',
                description: 'wing tips',
                plural: true,
                brands: [
                    Brand.FRATELLI_ROSSETTI,
                    Brand.GIORGIO_ARMANI,
                    Brand.RALPH_LAUREN,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            {
                id: 'lace_ups',
                description: 'lace-ups',
                plural: true,
                brands: [
                    Brand.BROOKS_BROTHERS,
                    Brand.ALLEN_EDMONDS,
                    Brand.GIORGIO_ARMANI,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            
            {
                id: 'shoes',
                description: 'shoes',
                plural: true,
                brands: [
                    Brand.ALLEN_EDMONDS,
                    Brand.BROOKS_BROTHERS,
                    Brand.COLE_HAAN,
                    Brand.FERRANGAMO,
                    Brand.GARRICK_ANDERSON,
                    Brand.PAUL_STUART,
                    Brand.GIORGIO_ARMANI,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            
            {
                id: 'loafers',
                description: 'loafers',
                plural: true,
                excludedBy: [ 'suit', 'suit_with_trousers', 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands: [
                    Brand.SUSAN_BENNIS_WARREN_EDWARDS,
                    Brand.BROOKS_BROTHERS,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            
            {
                id: 'pumps',
                description: 'pumps',
                plural: true,
                excludedBy: [ 'suit', 'suit_with_trousers', 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands: [
                    Brand.FERRANGAMO,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            
            {
                id: 'moccasins',
                description: 'moccasins',
                plural: true,
                excludedBy: [ 'suit', 'suit_with_trousers', 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands: [
                    Brand.COLE_HAAN,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
            
            {
                id: 'slip_ons',
                description: 'slip-ons',
                plural: true,
                excludedBy: [ 'suit', 'suit_with_trousers', 'tuxedo', 'tuxedo_with_trousers', 'dinner_jacket' ],
                brands: [
                    Brand.SUSAN_BENNIS_WARREN_EDWARDS,
                    Brand.GIANNI_VERSACE,
                    Brand.BAKER_BENJES,
                    Brand.ALLEN_EDMONDS,
                ],
                score: getScoreUniform(0, 1, Math.random),
            },
        ]
    }

];
