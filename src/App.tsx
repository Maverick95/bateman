import React, { useState } from 'react';
import StoryUpload from './Components/StoryUpload/StoryUpload';
import StoryDisplay from './Components/StoryDisplay/StoryDisplay';
import { Sentence } from './Models/Sentence';
import { processStory } from './Helpers/processStory';

const App: React.FC = () => {

    const [storyUpload, setStoryUpload] = useState<Sentence[]>(null);

    const processFile = (file: File): void => {
        file.text()
        .then((rawStory) => {
            setStoryUpload(processStory(rawStory));
        })
        .catch(() => {
            setStoryUpload(null);
        });
    };

    return (
        <>
        <StoryUpload processFile={processFile} />
        {storyUpload && <StoryDisplay story={storyUpload} />}
        </>
    );
};

export default App;