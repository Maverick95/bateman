import React from 'react';
import { Sentence } from '../../Models/Sentence';

interface IProps {
    story?: Sentence[];
}

const StoryDisplay: React.FC<IProps> = ( {story = [] }) => (

    <div className="story-display">
        {
            story.length > 0
            ? ( story.map(({words}) => (
            <p>{words.map((word, index, words) =>
                `${word}${index === words.length - 1 ? '.' : ' '}`)
                }</p>)) )
            : <p>You need to upload some story content!</p>
        }
    </div>

);

export default StoryDisplay;