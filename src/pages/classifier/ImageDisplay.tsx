import { Alert, Button, Loader } from '@mantine/core'
import { useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { IconAlertTriangle, IconSearch, IconTrash } from '@tabler/icons-react'

import Result from '@/classes/Result'
import ResultsDB from '@/classes/ResultsDB'
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
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    
    const navigate: NavigateFunction = useNavigate();

    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-2 px-4 md:px-0">
                {error && 
                    <Alert
                        className="w-[320px] md:w-[560px] font-Inter text-white my-4"
                        variant="filled"
                        color="#DB5461"
                        title="Error"
                        icon={ <IconAlertTriangle className="text-white" />}
                    >
                        <p className="font-Inter text-white text-justify">
                            The image you submitted could not be classified. Please try again later.
                        </p>
                    </Alert>
                }
                <img className="h-[240px] md:h-[420px] w-[320px] md:w-[560px]" src={image} /> 
                {!loading
                    ? <div className="flex flex-col md:flex-row place-content-center gap-8 my-4 mx-0 md:mx-4">
                        <Button
                            className="w-full md:w-[35%]"
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
                            className="w-full md:w-[35%]"
                            variant="filled"
                            color="#3943B7"
                            size="lg"
                            radius="md"
                            leftSection={<IconSearch className="text-white" size="32" />}
                            onClick={() => {
                                setError(false);
                                setLoading(true);
                                classifyImage(image)
                                    .then((res: JSON) => {
                                        // sort conditions
                                        const conditionObj: [string, number][] = Object.entries(res)
                                            .sort((a: [string, number], b: [string, number]) => {
                                                return b[1] - a[1];
                                            });

                                        // create diagnosis
                                        const conditionMap: Map<string, number> = new Map<string, number>(conditionObj);
                                        const diagnosis: Result = new Result(Date.now(), image, conditionMap);

                                        // insert into db
                                        const db: ResultsDB = new ResultsDB();
                                        db.results.add(diagnosis);
                                        
                                        // redirect
                                        navigate(`/diagnosis/${diagnosis.datetime}`);
                                    })
                                    .catch(() => setError(true))
                                    .finally(() => setLoading(false));
                            }}
                        >
                            <p className="font-Inter font-bold text-white text-xl">
                                Diagnose
                            </p>
                        </Button>
                    </div>
                    : <div className="flex flex-col items-center m-4 gap-4">
                        <Loader color="#3943B7" />
                        <p>
                            Classifying your image...
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}

export default ImageDisplay;