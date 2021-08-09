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

                // Words of sentence separated by single space.
                const regexSpace: RegExp = /^ [a-z]+/i;

                // End of sentence, indicated by a single period, or by any length of question/exclamation marks.
                // Followed either by nothing or single space or more words.
                const regexSentenceEnd: RegExp = /^(\.|[\!\?]+)( | [a-z]+)?/i;

                if (regexSpace.test(input)) {

                    input = input.slice(1);

                }
                else if (regexSentenceEnd.test(input)) {

                    sentences.push({ words: [...sentence.words], });
                    sentence = { words: [], };
                    const index2 = input.search(/[a-z]/i);
                    input = index2 === -1 ? '' : input.slice(index2);
        
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