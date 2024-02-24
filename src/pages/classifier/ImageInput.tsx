import { useRef, useState } from 'react'
import Webcam from 'react-webcam'

interface ImageInputProps {
    setImage: React.Dispatch<React.SetStateAction<string>>
}

//  DESC: Allows users to submit images for classifying from a url, local file, or webcam.
// PARAM: setImage - Setter from Home that saves image provided by user.
const ImageInput: React.FC<ImageInputProps> = ({ setImage }) => {
    const [imageURL, setImageURL] = useState<string>('');

    const [useCamera, setUseCamera] = useState<boolean>(false);
    const webcamRef = useRef<any>(null);

    return (
        <>
            <div>
                <input 
                    type="file" 
                    accept="image/png, image/jpeg" 
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files.length) {
                            // read image and save it in base64
                            const reader: FileReader = new FileReader();
                            reader.readAsDataURL(e.target.files[0]);
                            reader.onloadend = () => {
                                setImage(reader.result as string);
                            }
                        }
                    }} 
                />
                <div>
                    <input 
                        type="url"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setImageURL(e.target.value);
                        }}
                    />
                    <button 
                        onClick={async () => {
                            // grab the image from url
                            const res: Response = await fetch(imageURL);
                            const blob: Blob = await res.blob();

                            // convert image into base64 and save it
                            const reader: FileReader = new FileReader();
                            reader.readAsDataURL(blob);
                            reader.onloadend = () => {
                                setImage(reader.result as string);
                            }
                        }}
                    >
                        submit
                    </button>
                </div>
                <div>
                    {useCamera && <div>
                        <Webcam 
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                        />
                        <button
                            onClick={() => {
                                // captures image from webcam and saves it
                                if (webcamRef.current) {
                                    const image: string = (webcamRef.current as any).getScreenshot();
                                    setImage(image);
                                }
                            }}
                        >
                            take picture
                        </button>
                    </div>}
                    <button
                        onClick={() => setUseCamera(!useCamera)}
                    >
                        turn {useCamera ? 'off' : 'on'} camera
                    </button>
                </div>
            </div>
        </>
    );
}

export default ImageInput;