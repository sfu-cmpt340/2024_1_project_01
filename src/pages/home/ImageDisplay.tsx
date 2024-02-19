interface ImageDisplayProps {
    image: string,
    setImage: React.Dispatch<React.SetStateAction<string>>
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, setImage }) => {
    return (
        <div>
            <img src={image} /> 
            <button 
                onClick={() => setImage('')}
            >
                remove image
            </button>
        </div>
    );
}

export default ImageDisplay;