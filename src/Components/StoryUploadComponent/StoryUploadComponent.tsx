import React, { useState } from 'react';
import { StoryUploadDragAndDropStatus } from '../../Models/StoryUpload';
import './StoryUploadComponent.css';

const storyUploadDragAndDropStatusLookups: Record<StoryUploadDragAndDropStatus, string> = {
    [StoryUploadDragAndDropStatus.NO_DRAG]: 'Do some dragging!',
    [StoryUploadDragAndDropStatus.NO_ITEM]: 'Drag SOMETHING!',
    [StoryUploadDragAndDropStatus.MULTIPLE_ITEMS]: 'One item only!',
    [StoryUploadDragAndDropStatus.WRONG_TYPE]: 'Text files only!',
    [StoryUploadDragAndDropStatus.DROPPED_WRONG]: 'Seriously, why did you do that?',
    [StoryUploadDragAndDropStatus.SUCCESS]: 'Well done!',
};

const StoryUploadComponent: React.FC = () => {

    const [status, setStatus] = useState<StoryUploadDragAndDropStatus>(StoryUploadDragAndDropStatus.NO_DRAG);

    const getStatus = (files: DataTransferItemList): StoryUploadDragAndDropStatus => {
        const fileCount = files?.length ?? 0;
        if (fileCount > 0) {
            if (fileCount === 1) {
                if (files[0].kind === 'file' && files[0].type === 'text/plain') {
                    return StoryUploadDragAndDropStatus.SUCCESS;
                }
                return StoryUploadDragAndDropStatus.WRONG_TYPE;
            }
            return StoryUploadDragAndDropStatus.MULTIPLE_ITEMS;
        }
        return StoryUploadDragAndDropStatus.NO_ITEM;
    }

    const storyUploadDragEnter = (event: React.DragEvent): void => {
        const files: DataTransferItemList = event.dataTransfer?.items;
        const statusFromFiles = getStatus(files);
        setStatus(statusFromFiles);
    }

    const storyUploadDragOver = (event: React.DragEvent): void => {
        event.preventDefault();
    }

    const storyUploadDrop = (event: React.DragEvent): void => {
        event.preventDefault();
        const files: DataTransferItemList = event.dataTransfer?.items;
        const statusFromFiles = getStatus(files);
        if (statusFromFiles === StoryUploadDragAndDropStatus.SUCCESS) {
            console.log('Success!');
        }
        else {
            setStatus(StoryUploadDragAndDropStatus.DROPPED_WRONG);
        }
    }

    const storyUploadDragLeave = (event: React.DragEvent): void => {
        setStatus(StoryUploadDragAndDropStatus.NO_DRAG);
    }

    return (
        <>
            <div className="story-upload">
                <p>Upload a file here!</p>
                <div
                    className="story-upload-overlay"
                    onDragEnter={storyUploadDragEnter}
                    onDragOver={storyUploadDragOver}
                    onDrop={storyUploadDrop}
                    onDragLeave={storyUploadDragLeave} />
            </div>
            <p>{storyUploadDragAndDropStatusLookups[status]}</p>
        </>
    );

};

export default StoryUploadComponent;