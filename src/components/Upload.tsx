// import React, {useState} from "react";


// function upload() {
	
// 	return (
// 		<div class="flex  items-center justify-center bg-grey-lighter my-28">
// 			<label class="w-64 flex flex-col items-center px-4 py-6 bg-blue text-blue rounded-full shadow-inner tracking-wide uppercase border border-solid cursor-pointer hover:bg-blue hover:text-white">
// 				<svg
// 					class="w-8 h-8"
// 					fill="currentColor"
// 					xmlns="http://www.w3.org/2000/svg"
// 					viewBox="0 0 20 20"
// 				>
// 					<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
// 				</svg>
// 				<span class="mt-2 text-base leading-normal">Select a file</span>
// 				<input type="file" class="hidden" />
// 			</label>
// 		</div>
// 	);
// }

// export default upload;

import React from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

const FileUploadComponent = () => {
    const fileParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' }
    }
    const onFileChange = ({ meta, file }, status) => { 
        console.log(status, meta, file) 
    }
    const onSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove())
    }
    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }
    const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
        const textMsg = files.length > 0 ? 'Upload Again' : 'Select Files'
        return (
            <label className="btn btn-danger mt-4">
                {textMsg}
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    multiple
                    onChange={e => {
                        getFilesFromEvent(e).then(chosenFiles => {
                            onFiles(chosenFiles)
                        })
                    }}
                />
            </label>
        )
    }
    return (
        <Dropzone
            className="bg-red-100"
            onSubmit={onSubmit}
            onChangeStatus={onFileChange}
            InputComponent={selectFileInput}
            getUploadParams={fileParams}
            getFilesFromEvent={getFilesFromEvent}
            accept="image/*,audio/*,video/*"
            maxFiles={5}
            inputContent="Drop A File"
            styles={{
                dropzone: { width: 600, height: 300 },
                dropzoneActive: { borderColor: 'blue' },
            }}            
        />
    );
};
export default FileUploadComponent;