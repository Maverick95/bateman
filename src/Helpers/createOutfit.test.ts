import { data_generateProcessData } from './createOutfit.testdata';
import { CreateOutfitData, generateProcessData } from './createOutfit';
import { ClothingOutfit } from '../Models/Clothing';

describe('generateProcessData', () => {

    it.each(data_generateProcessData.map((value) => [ value.input, value.expected ]))
    ('Test case %#', (input, expected) => {

        // ARRANGE.
        const input_typed = input as ClothingOutfit;
        const expected_typed = expected as CreateOutfitData;

        // ACT
        const output = generateProcessData(input_typed);

        // ASSERT
        expect(output).toEqual(expected_typed);

    });

});