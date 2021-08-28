import React from 'react';
import { Sentence } from '../../Models/Sentence';
import { getSentenceUniqueKey } from '../../Helpers/processStory';

interface IProps {
    story?: Sentence[];
}

const StoryDisplay: React.FC<IProps> = ( {story = [] }) => (

    <div className="story-display">
        {
            story.length > 0
            ?
            ( story.map(({words}) => (
            <p key={getSentenceUniqueKey(words)}>
                {words.map((word, index, words) =>
                `${word}${index === words.length - 1 ? '.' : ' '}`)
                .join('')}
            </p>)) )
            :
            <p>You need to upload some story content!</p>
        }
    </div>

);

export default StoryDisplay;