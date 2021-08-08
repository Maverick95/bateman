import { Sentence } from '../Models/Sentence';

const processStory = (input: string): Sentence[] => {

    const sentences: Sentence[] = [];

    let sentence: Sentence = {
        words: [],
    };

    while (input.length) {

        const index = input.search(/[^a-z]/i);

        if (index !== -1) {

            if (index > 0) {

                sentence.words.push(input.substring(0, index));
                input = input.slice(index);

                if (input[0] === ' ') {
                    input = input.slice(1);
                }
                else if (input[0] === '.') {
                    if (input[1] === ' ') {
                        sentences.push({
                            words: [...sentence.words],
                        });
                        input = input.slice(2);
                        sentence = {
                            words: [],
                        };
                    }
                    else {
                        // Return error.
                        return;
                    }

                }
                else {
                    // Return error.
                    return;
                }
            }
            else {
                // Return error.
                return;
            }

        }

    }

    return sentences;

};

export default processStory;