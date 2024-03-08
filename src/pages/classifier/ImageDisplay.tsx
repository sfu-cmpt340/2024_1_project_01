import { Button } from '@mantine/core'
import { IconSearch, IconTrash } from '@tabler/icons-react'

import classifyImage from './classifyImage'

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
        <div className="flex justify-center">
            <div className="flex flex-col gap-2">
                <img className="h-[480px] w-[640px]" src={image} /> 
                <div className="flex place-content-center gap-8 m-4">
                    <Button
                        className="w-[35%]"
                        variant="filled"
                        color="#DB5461"
                        size="lg"
                        radius="md"
                        leftSection={<IconTrash className="text-white" size="32" />}
                        onClick={() => setImage('')}
                    >
                        <p className="font-Inter font-bold text-white text-xl">
                            Remove
                        </p>
                    </Button>
                    <Button
                        className="w-[35%]"
                        variant="filled"
                        color="#3943B7"
                        size="lg"
                        radius="md"
                        leftSection={<IconSearch className="text-white" size="32" />}
                        onClick={() => {
                            classifyImage(image)
                                .then((res: JSON) => console.log(res));
                        }}
                    >
                        <p className="font-Inter font-bold text-white text-xl">
                            Diagnose
                        </p>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ImageDisplay;