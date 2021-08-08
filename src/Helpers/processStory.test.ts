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

});