interface ImageDisplayProps {
    image: string,
    setImage: React.Dispatch<React.SetStateAction<string>>
}

//  DESC: Shows the user the image they have submitted to the classifier.
//   PRE: image is a valid image. 
// PARAM: image - The user's submitted image to be classified.
//        setImage - Setter from Home that allows users to remove their provided image.
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