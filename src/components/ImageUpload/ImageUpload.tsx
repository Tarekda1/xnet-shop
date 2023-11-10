import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface ImageUploadProps {
    // Add any other props that your component might need
    register: any;
    Controller: any;
    control: any;
    errors: any;
    setValue:any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ register, control, errors ,setValue}) => {
    const [file, setFile] = useState<File | null>(null);
    const [showWebCam, setShowWebCam] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [previewSource, setPreviewSource] = useState<string | null>(null);
    const productImageRegister = register("image");
    const webcamRef = useRef<any>(null);

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`handleFileInputChange`);
        const file = e.target.files && e.target.files[0];
        console.log(file);
        previewFile(file);
    };

    const onCapture = (dataUri: any) => {
        setCapturedImage(dataUri);
    };

    function dataURItoBlob(dataURI:any) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
  
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
      }

    const capture = () => {
        const imageSrc = webcamRef?.current?.getScreenshot();
        // Now you can do whatever you want with the image source, e.g., save it to your server.
        console.log('Captured image:', imageSrc);
        setShowWebCam(true);
        setCapturedImage(imageSrc);
        productImageRegister.onChange({ target: { value: imageSrc, name: "image" } });
        const blob=dataURItoBlob(imageSrc);
        const file=new File([blob], "file_name");

        setValue("image", {0:file,length:1})
        setShowWebCam(false);
    };


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
        <div className="bg-white border shadow-lg rounded-lg p-8 flex flex-col sm:flex-col">
            <div className="w-full sm:w-full h-full">
                <input
                    type="file"
                    id="image"
                    className="hidden"
                    name='image'
                    {...productImageRegister}
                    onChange={(e) => {
                        console.log(e.target.files ? e.target?.files[0] : null);
                        console.log(e);
                        productImageRegister.onChange(e);
                        //   onChange({ target: { value: e.target.files ? e.target.files[0] : null, name: name } });
                        handleFileInputChange(e)
                    }}
                />
                {/* )} /> */}
                <label htmlFor="image" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 border-radius-md h-full w-full flex items-center justify-center">
                        <p className="text-gray-400">Click to upload</p>
                    </div>
                </label>
            </div>
            <div className="w-full sm:w-full h-full mt-4 sm:mt-0">
                {previewSource && (
                    <img src={previewSource} alt="chosen" className="h-48 w-full object-contain" />
                )}
                {showWebCam && !previewSource &&
                    <div className="flex mt-2">
                        <Webcam ref={ (e)=>{
                            webcamRef.current=e;
                            productImageRegister.ref(e);
                            }} />
                    </div>}
                {!showWebCam &&
                    <div className='mt-2 mb-2 flex justify-center flex-col items-center'>
                        <span className='pr-2'>Or</span>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={(e) => {
                            setShowWebCam(true);
                            setCapturedImage(null);
                        }}> <i className="fa fa-camera"></i> Use Camera</button>
                    </div>}
                {capturedImage && !previewSource && (
                    <div>
                        <img src={capturedImage} alt="chosen" className="h-40 w-full object-contain" />
                    </div>
                )}
                {showWebCam && !previewSource &&
                    <div className="flex justify-center mt-4 mb-2">
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={(e) => {
                            capture();
                        }}>Capture</button>
                    </div>}
                {errors.image && <p className="text-red-500">This is required.</p>}
            </div>
        </div>
    );
};

export default ImageUpload;