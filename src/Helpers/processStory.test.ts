import processStory from './processStory';
import { Sentence } from '../Models/Sentence';

describe('processStory', () => {

    describe('Happy-path cases', () => {

        it.each([
            [
                'This is a single sentence. ',
                [
                    {
                        words: ['This', 'is', 'a', 'single', 'sentence',],
                    },
                ],
            ],
            [
                'Paul walked into the room. The room was very big. ',
                [
                    {
                        words: ['Paul', 'walked', 'into', 'the', 'room',],
                    },
                    {
                        words: ['The', 'room', 'was', 'very', 'big',],
                    },
                ],
            ],
            [
                'Jack went outside. There was no room. It was very cold. ',
                [
                    {
                        words: ['Jack', 'went', 'outside',],
                    },
                    {
                        words: ['There', 'was', 'no', 'room',],
                    },
                    {
                        words: ['It', 'was', 'very', 'cold',],
                    },
                ],
            ],
        ])('Should return correct result for "%s"', (input: string, actual: Sentence[]) => {

            // ARRANGE and ACT.
            const expected = processStory(input);

            // ASSERT.
            expect(expected).toEqual(actual);

        });

    });

    describe('Negative-path cases', () => {

        it.each([
            [
                'This should fail.',
                [
                    {
                        words: ['This', 'should', 'fail',],
                    },
                ],
            ],
            [
                'Paul walked into the room. This should also fail.',
                [
                    {
                        words: ['Paul', 'walked', 'into', 'the', 'room',],
                    },
                    {
                        words: ['This', 'should', 'also', 'fail',],
                    },
                ],
            ],
        ])('Should return correct result for "%s"', (input: string, actual: Sentence[]) => {

            // ARRANGE and ACT.
            const expected = processStory(input);

            // ASSERT.
            expect(expected).toEqual(actual);

        });

    });

    describe('Negative-path cases 2', () => {

        it.each([
            [
                'What the heck is this!?!?!? This should fail for sure!!!',
                [
                    {
                        words: ['What', 'the', 'heck', 'is', 'this',],
                    },
                    {
                        words: ['This', 'should', 'fail', 'for', 'sure',],
                    },
                ],
            ],
            [
                'This is a sentence. But this???! Get out of here.',
                [
                    {
                        words: ['This', 'is', 'a', 'sentence',],
                    },
                    {
                        words: ['But', 'this',],
                    },
                    {
                        words: ['Get', 'out', 'of', 'here',],
                    },
                ],
            ],
        ])('Should return correct result for "%s"', (input: string, actual: Sentence[]) => {

            // ARRANGE and ACT.
            const expected = processStory(input);

            // ASSERT.
            expect(expected).toEqual(actual);

        });

    });

});