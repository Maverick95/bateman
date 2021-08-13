import processStory from './processStory';
import { Sentence } from '../Models/Sentence';

describe('processStory', () => {

    describe('Initial happy path - only words, spaces and periods allowed', () => {

        it.each([
            [
                'This is a single sentence. ',
                [
                    { words: ['This', 'is', 'a', 'single', 'sentence',], },
                ],
            ],
            [
                'Paul walked into the room. The room was very big. ',
                [
                    { words: ['Paul', 'walked', 'into', 'the', 'room',], },
                    { words: ['The', 'room', 'was', 'very', 'big',], },
                ],
            ],
            [
                'Jack went outside. There was no room. It was very cold. ',
                [
                    { words: ['Jack', 'went', 'outside',], },
                    { words: ['There', 'was', 'no', 'room',], },
                    { words: ['It', 'was', 'very', 'cold',], },
                ],
            ],
        ])('Should return correct result for "%s"', (input: string, actual: Sentence[]) => {

            // ARRANGE and ACT.
            const expected = processStory(input);

            // ASSERT.
            expect(expected).toEqual(actual);

        });

    });

    describe('Addition 1 - stream can end with period', () => {

        it.each([
            [
                'This should fail.',
                [
                    { words: ['This', 'should', 'fail',], },
                ],
            ],
            [
                'Paul walked into the room. This should also fail.',
                [
                    { words: ['Paul', 'walked', 'into', 'the', 'room',], },
                    { words: ['This', 'should', 'also', 'fail',], },
                ],
            ],
        ])('Should return correct result for "%s"', (input: string, actual: Sentence[]) => {

            // ARRANGE and ACT.
            const expected = processStory(input);

            // ASSERT.
            expect(expected).toEqual(actual);

        });

    });

    describe('Addition 2 - question and exclamation marks end sentences', () => {

        it.each([
            [
                'What the heck is this!?!?!? This should fail for sure!!!',
                [
                    { words: ['What', 'the', 'heck', 'is', 'this',], },
                    { words: ['This', 'should', 'fail', 'for', 'sure',], },
                ],
            ],
            [
                'This is a sentence. But this???! Get out of here.',
                [
                    { words: ['This', 'is', 'a', 'sentence',], },
                    { words: ['But', 'this',], },
                    { words: ['Get', 'out', 'of', 'here',], },
                ],
            ],
        ])('Should return correct result for "%s"', (input: string, actual: Sentence[]) => {

            // ARRANGE and ACT.
            const expected = processStory(input);

            // ASSERT.
            expect(expected).toEqual(actual);

        });

    });

    describe('Addition 3 - commas separate words in sentences', () => {

        it.each([
            [
                'Commas, right, are what separate sentences! You get me!?!?',
                [
                    { words: ['Commas', 'right', 'are', 'what', 'separate', 'sentences',], },
                    { words: ['You', 'get', 'me',], },
                ],
            ],
            [
                'Thankfully, my work should make this readable. At least, for now.',
                [
                    { words: ['Thankfully', 'my', 'work', 'should', 'make', 'this', 'readable',], },
                    { words: ['At', 'least', 'for', 'now',], },
                ],
            ],
        ])('Should return correct result for "%s"', (input: string, actual: Sentence[]) => {

            // ARRANGE and ACT.
            const expected = processStory(input);

            // ASSERT.
            expect(expected).toEqual(actual);

        });

    });

    describe('Addition 4 - hyphens separate words in sentences', () => {

        it.each([
            [
                'The hyphen is - just glorious, really.',
                [
                    { words: ['The', 'hyphen', 'is', 'just', 'glorious', 'really',], },
                ],
            ],
            [
                'Hyphens are - it seems - a useful method for separation.',
                [
                    { words: ['Hyphens', 'are', 'it', 'seems', 'a', 'useful', 'method', 'for', 'separation',], },
                ],
            ],
        ])('Should return correct result for "%s"', (input: string, actual: Sentence[]) => {

            // ARRANGE and ACT.
            const expected = processStory(input);

            // ASSERT.
            expect(expected).toEqual(actual);

        });

    });

    describe('Addition 5 - liberal use of white space allowed', () => {

        it.each([
            [
                'White    space cannot be   used    this poorly ! ? It would destroy the  program .   ',
                [
                    { words: ['White', 'space', 'cannot', 'be', 'used', 'this', 'poorly'], },
                    { words: ['It', 'would', 'destroy', 'the', 'program'], },
                ],
            ],
            [
                'This      clear        breaking    of the rules       shocks me ! ! ! I am     shocked.',
                [
                    { words: ['This', 'clear', 'breaking', 'of', 'the', 'rules', 'shocks', 'me'], },
                    { words: ['I', 'am', 'shocked'], },
                ],
            ],
            [
                'By god!These       rules are not  .Tricky      .      ! ! ?? ! Bless   !',
                [
                    { words: ['By', 'god'], },
                    { words: ['These', 'rules', 'are', 'not'], },
                    { words: ['Tricky'], },
                    { words: ['Bless'], },
                ]
            ]
        ])('Should return correct result for "%s"', (input: string, actual: Sentence[]) => {

            // ARRANGE and ACT.
            const expected = processStory(input);

            // ASSERT.
            expect(expected).toEqual(actual);

        });

    });

    describe('Addition 6 - sections of words separated with single hyphens', () => {

        it.each([
            [
                'Peter Warnington-Medley-Smith  came  to visit today.  ',
                [
                    { words: ['Peter', 'Warnington-Medley-Smith', 'came', 'to', 'visit', 'today'], },
                ],
            ],
            [
                'Make       post-haste with    post-haste  !  ',
                [
                    { words: ['Make', 'post-haste', 'with', 'post-haste'], },
                ],
            ]
        ])('Should return correct result for "%s"', (input: string, actual: Sentence[]) => {

            // ARRANGE and ACT.
            const expected = processStory(input);

            // ASSERT.
            expect(expected).toEqual(actual);

        });
    });

    describe('Addition 7 - three or more periods separates words in a sentence', () => {

        it.each([
            [
                'These sentences are    ...  getting complicated.  ',
                [
                    { words: ['These', 'sentences', 'are', 'getting', 'complicated'], },
                ],
            ],
            [
                'Zzzz... goodnight .... my .......      love .  ',
                [
                    { words: ['Zzzz', 'goodnight', 'my', 'love'], },
                ],
            ]
        ])('Should return correct result for "%s"', (input: string, actual: Sentence[]) => {

            // ARRANGE and ACT.
            const expected = processStory(input);

            // ASSERT.
            expect(expected).toEqual(actual);

        });
    });

    describe('Addition 8 - numbers are also valid characters', () => {

        it.each([
            [
                'I ate 11   sausage rolls   today.   ',
                [
                    { words: ['I', 'ate', '11', 'sausage', 'rolls', 'today'], },
                ],
            ],
            [
                'This is the 2nd time   using  numbers. Not the 1st      .  ',
                [
                    { words: ['This', 'is', 'the', '2nd', 'time', 'using', 'numbers'], },
                    { words: ['Not', 'the', '1st'], },
                    
                ],
            ]
        ])('Should return correct result for "%s"', (input: string, actual: Sentence[]) => {

            // ARRANGE and ACT.
            const expected = processStory(input);

            // ASSERT.
            expect(expected).toEqual(actual);

        });
    });

});