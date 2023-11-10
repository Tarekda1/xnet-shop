import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';


const ImageUploadDrop: React.FC<any> = () => {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>      <aside>
                <h4>Files:</h4>
                <ul>{files.map((file: any) => {
                    console.log(file);
                    return <>
                        <li key={file.name}>
                            <img src={file.preview} alt={file.name} />
                        </li>
                    </>
                })}</ul>
            </aside>
        </div>
    );
};

export default ImageUploadDrop;