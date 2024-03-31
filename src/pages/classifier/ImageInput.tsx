import { ActionIcon, Button, Progress, TextInput } from '@mantine/core'
import { useFocusWithin } from '@mantine/hooks'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { IconCamera, IconCircleFilled, IconCopy, IconPhoto, IconX } from '@tabler/icons-react'

interface ImageInputProps {
    setImage: React.Dispatch<React.SetStateAction<string>>
}

//  DESC: Allows users to submit images for classifying from a url, local file, or webcam.
// PARAM: setImage - Setter from Home that saves image provided by user.
const ImageInput: React.FC<ImageInputProps> = ({ setImage }) => {
    const { ref, focused } = useFocusWithin();

    const [useCamera, setUseCamera] = useState<boolean>(false);
    const webcamRef = useRef<any>(null);

    return (
        <div className="flex justify-center p-6 md:p-0">
            {!useCamera
                ? <div className="flex flex-col place-items-center font-Inter border-grey border-4 border-dashed">
                    <Dropzone
                        className="px-10 md:px-20 py-8 md:py-14"
                        onDrop={(file: FileWithPath[]) => {
                            // read image and save it in base64
                            const reader: FileReader = new FileReader();
                            reader.readAsDataURL(file[0]);
                            reader.onloadend = () => {
                                setImage(reader.result as string);
                            }
                        }}
                        accept={IMAGE_MIME_TYPE}
                    >
                        <div className="flex flex-col md:flex-row items-center gap-2 text-black text-center">
                            <IconPhoto size="48" /> 
                            Drag an image here or click to select a file
                        </div>
                    </Dropzone>
                    <div className="flex w-full items-center justify-center gap-1 text-grey text-xs px-2 md:px-4">
                        <Progress className="w-full" size="1" color="#CED3DC" value={100} />
                        OR
                        <Progress className="w-full" size="1" color="#CED3DC" value={100} />
                    </div>
                    <div className="flex flex-col md:flex-row justify-center gap-4 w-full px-2 py-4 md:py-10">
                        <div ref={ref} className="w-full md:w-[45%]">
                            {!focused
                                ? <Button
                                    className="w-full"
                                    variant="default"
                                    size="lg"
                                    radius="md"
                                    leftSection={<IconCopy className="text-black" size="32" />}
                                >
                                    <p className="text-black text-sm font-normal">
                                        Paste image or URL
                                    </p>
                                </Button>
                                : <TextInput
                                    autoFocus
                                    size="lg"
                                    radius="md"
                                    placeholder="Paste image or URL"
                                    onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                        // grab the image from url
                                        const res: Response = await fetch(e.target.value);
                                        const blob: Blob = await res.blob()

                                        // convert image into base64 and save it
                                        const reader: FileReader = new FileReader();
                                        reader.readAsDataURL(blob);
                                        reader.onloadend = () => {
                                            // check if data read is an image in base64
                                            if (reader.result && (reader.result as string).match(/data:image\/[a-zA-Z]+;base64/g)) {
                                                setImage(reader.result as string);
                                            }
                                        }                                
                                    }}
                                />
                            }
                        </div>
                        <Button
                            className="w-full md:w-[45%]"
                            variant="default"
                            size="lg"
                            radius="md"
                            leftSection={<IconCamera className="text-black" size="32" />}
                            onClick={() => setUseCamera(true)}
                        >
                            <p className="text-black text-sm font-normal">
                                Take a photo
                            </p>
                        </Button>
                    </div>
                </div>
                : <div className="h-[240px] md:h-[420px] w-[320px] md:w-[560px] relative z-0 -m-8">
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                    />
                    <div className="absolute z-10 top-0 right-0 p-4">
                        <ActionIcon
                            variant="transparent"
                            size="xl"
                            onClick={() => setUseCamera(false)}
                        >
                            <IconX className="text-grey" size="48" />
                        </ActionIcon> 
                    </div>
                    <div className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 p-4">
                        <ActionIcon
                            variant="transparent"
                            size="xl"
                            onClick={() => {
                                // captures image from webcam and saves it
                                if (webcamRef.current) {
                                    const image: string = (webcamRef.current as any).getScreenshot();
                                    setImage(image);
                                }
                            }}
                        >
                            <IconCircleFilled className="text-blue" size="48" />
                        </ActionIcon>
                    </div>
                </div>
            }
        </div>
    );
}

export default ImageInput;