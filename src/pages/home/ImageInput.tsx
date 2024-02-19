import { useState } from "react"

interface ImageInputProps {
    setImage: React.Dispatch<React.SetStateAction<string>>
}

const ImageInput: React.FC<ImageInputProps> = ({ setImage }) => {
    const [imageURL, setImageURL] = useState<string>('');

    return (
        <>
            <div>
                <input 
                    type="file" 
                    accept="image/png, image/jpeg" 
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files.length) {
                            const objectURL: string = URL.createObjectURL(e.target.files[0]);
                            setImage(objectURL);
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
                            const res: Response = await fetch(imageURL);
                            const blob: Blob = await res.blob();
                            const objectURL: string = URL.createObjectURL(blob);
                            setImage(objectURL);
                        }}
                    >
                        submit
                    </button>
                </div>
            </div>
        </>
    );
}

export default ImageInput;