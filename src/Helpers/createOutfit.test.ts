import { data_generateProcessData } from './createOutfit.testdata';
import { CreateOutfitData, createOutfit, getCreateOutfitData } from './createOutfit';
import { Clothing } from '../Data/Clothing';
import { ClothingOutfit } from '../Models/Clothing';

describe('getCreateOutfitData', () => {

    it.each(data_generateProcessData.map((value) => [ value.input, value.expected ]))
    ('should generate correct output for Test Case %#', (input, expected) => {

        // ARRANGE.
        const input_typed = input as ClothingOutfit;
        const expected_typed = expected as CreateOutfitData;

        // ACT
        const output = getCreateOutfitData(input_typed);

        // ASSERT
        expect(output).toEqual(expected_typed);

    });

});

describe('createOutfit', () => {

    it('should correctly produce outfit for the standard dataset', () => {

        const actual = createOutfit(Clothing);
        console.log(actual);

    });

});