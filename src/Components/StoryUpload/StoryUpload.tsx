import React, { useState } from 'react';
import { StoryUploadDragAndDropStatus } from '../../Models/StoryUpload';
import './StoryUpload.css';

const storyUploadDragAndDropStatusLookups: Record<StoryUploadDragAndDropStatus, string> = {
    [StoryUploadDragAndDropStatus.NO_DRAG]: 'Do some dragging!',
    [StoryUploadDragAndDropStatus.NO_ITEM]: 'Drag SOMETHING!',
    [StoryUploadDragAndDropStatus.MULTIPLE_ITEMS]: 'One item only!',
    [StoryUploadDragAndDropStatus.WRONG_TYPE]: 'Text files only!',
    [StoryUploadDragAndDropStatus.DROPPED_WRONG]: 'Seriously, why did you do that?',
    [StoryUploadDragAndDropStatus.SUCCESS]: 'Well done!',
};

interface IProps {
    processFile: (file: File) => void;
}

interface IGetStatusReturn {
    status: StoryUploadDragAndDropStatus;
    file?: File;
}

const StoryUpload: React.FC<IProps> = ( {processFile} ) => {

    const [status, setStatus] = useState<StoryUploadDragAndDropStatus>(StoryUploadDragAndDropStatus.NO_DRAG);

    const getStatus = (
        files: DataTransferItemList,
        includeFile: boolean = false
        ): IGetStatusReturn => {
        const fileCount = files?.length ?? 0;
        if (fileCount > 0) {
            if (fileCount === 1) {
                if (files[0].kind === 'file' && files[0].type === 'text/plain') {
                    const result: IGetStatusReturn = { status: StoryUploadDragAndDropStatus.SUCCESS };
                    if (includeFile) {
                        result.file = files[0].getAsFile();
                    }
                    return result;
                }
                return { status: StoryUploadDragAndDropStatus.WRONG_TYPE };
            }
            return { status: StoryUploadDragAndDropStatus.MULTIPLE_ITEMS };
        }
        return { status: StoryUploadDragAndDropStatus.NO_ITEM };
    }

    const storyUploadDragEnter = (event: React.DragEvent): void => {
        const files: DataTransferItemList = event.dataTransfer?.items;
        const statusFromFiles = getStatus(files);
        setStatus(statusFromFiles.status);
    }

    const storyUploadDragOver = (event: React.DragEvent): void => {
        event.preventDefault();
    }

    const storyUploadDrop = (event: React.DragEvent): void => {
        event.preventDefault();
        const files: DataTransferItemList = event.dataTransfer?.items;
        const statusFromFiles = getStatus(files, true);
        if (statusFromFiles.status === StoryUploadDragAndDropStatus.SUCCESS) {
            processFile(statusFromFiles.file);
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

export default StoryUpload;