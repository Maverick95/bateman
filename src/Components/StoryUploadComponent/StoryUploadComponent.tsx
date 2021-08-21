import React, { useState } from 'react';
import { StoryUploadDragAndDropStatus } from '../../Models/StoryUpload';
import './StoryUploadComponent.css';

const storyUploadDragAndDropStatusLookups: Record<StoryUploadDragAndDropStatus, string> = {
    [StoryUploadDragAndDropStatus.NO_DRAG]: 'Do some dragging!',
    [StoryUploadDragAndDropStatus.NO_ITEM]: 'Drag SOMETHING!',
    [StoryUploadDragAndDropStatus.MULTIPLE_ITEMS]: 'One item only!',
    [StoryUploadDragAndDropStatus.WRONG_TYPE]: 'Text files only!',
    [StoryUploadDragAndDropStatus.SUCCESS]: 'Well done!',
};

const StoryUploadComponent: React.FC = () => {

    const [status, setStatus] = useState<StoryUploadDragAndDropStatus>(StoryUploadDragAndDropStatus.NO_DRAG);

    const storyUploadDragOver = (event: React.DragEvent) => {

        const files: DataTransferItemList = event.dataTransfer?.items;
        const fileCount = files?.length ?? 0;
        if (fileCount === 0) {
            setStatus(StoryUploadDragAndDropStatus.NO_ITEM);
        }
        else if (fileCount > 1) {
            setStatus(StoryUploadDragAndDropStatus.MULTIPLE_ITEMS);
        }
        else {
            const file = files[0];
            console.log(file.kind);
            console.log(file.type);
            console.log(file.getAsFile());
            
            if (file.kind !== 'file') {
                setStatus(StoryUploadDragAndDropStatus.WRONG_TYPE);
            }
            else if ((/^text\/.+/).test(file.getAsFile()?.type)) {
                setStatus(StoryUploadDragAndDropStatus.SUCCESS);
            }
            else {
                setStatus(StoryUploadDragAndDropStatus.WRONG_TYPE);
            }
        }

    }

    const storyUploadDragLeave = (event: React.DragEvent) => {
        setStatus(StoryUploadDragAndDropStatus.NO_DRAG);
    }

    return (
        <>
            <div
                className="story-upload"
                onDragEnter={storyUploadDragOver}
                onDragLeave={storyUploadDragLeave}
                >
                <p>Upload a file here!</p>
            </div>
            <p>{storyUploadDragAndDropStatusLookups[status]}</p>
        </>
    );

};

export default StoryUploadComponent;