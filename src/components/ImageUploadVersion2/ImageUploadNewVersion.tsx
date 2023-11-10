import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Controller } from 'react-hook-form';

interface ImageUploadProps {
    // Add any other props that your component might need
    register: any;
    Controller: any;
    control: any;
    errors: any;
}

const ImageUploadNewVersion: React.FC<ImageUploadProps> = ({ register, control, errors }) => {
    const [uploadedFile, setUploadedFile] = useState<string | null>(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [previewSource, setPreviewSource] = useState<string | null>(null);
    const productImageRegister = register("image", { required: true });
    const webcamRef = useRef<any>(null);

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`handleFileInputChange`);
        const file = e.target.files && e.target.files[0];
        previewFile(file);
    };

    const onCapture = (dataUri: any) => {
        setCapturedImage(dataUri);
    };

    const capture = () => {
        const imageSrc = webcamRef?.current?.getScreenshot();
        // Now you can do whatever you want with the image source, e.g., save it to your server.
        console.log('Captured image:', imageSrc);
        setCapturedImage(imageSrc);
        productImageRegister.onChange({ target: { value: imageSrc, name: "image" } });
    };

    // const setConstraints = (data: string) => {
    //     setCapturedImage(data);
    // };

    // const handleImageCapture = () => {
    //     setConstraints(webcamRef.current.getScreenshot());
    // };


    const previewFile = (file: File | null) => {
        console.log(file);
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result as string);
        };
    };

    return (
        <div className="bg-white border shadow-lg rounded-lg p-8 flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2 h-full">
                <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setUploadedFile(URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                        />
                    )}
                />
                <label htmlFor="file" className="mb-2 text-lg cursor-pointer">
                    Choose a file
                </label>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                    Upload
                </button>
            </div>
            <div className="w-full sm:w-1/2 h-full mt-4 sm:mt-0">
                <button onClick={capture} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2">
                    Capture
                </button>
                <div className="mt-4">
                    {uploadedFile ? (
                        <img src={uploadedFile} alt="uploaded" className="w-64 h-64 object-cover" />
                    ) : (
                        capturedImage &&
                        <img src={capturedImage} alt="captured" className="w-64 h-64 object-cover" />
                    )}
                </div>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
                {errors.image && <p className="text-red-500">This is required.</p>}
            </div>
        </div>
    );
};

export default ImageUploadNewVersion;