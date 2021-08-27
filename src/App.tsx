import React from 'react';
import StoryUploadComponent from './Components/StoryUploadComponent/StoryUploadComponent';

const App: React.FC = () => {

    const processFile = (file: File): void => {
        console.log('Success!');
    };

    return (
        <StoryUploadComponent processFile={processFile} />
    );
};

export default App;