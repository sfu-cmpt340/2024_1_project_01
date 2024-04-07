import { Button, Overlay } from '@mantine/core'
import { useEffect, useState } from 'react'
import { IconEyeOff } from '@tabler/icons-react'

interface ImageProps {
    src: string;
}

//  DESC: Displays an image with a content warning. 
//   PRE: src is a valid image.
// PARAM: src - A link to an image. 
const Image: React.FC<ImageProps> = ({ src }) => {
    const [hidden, setHidden] = useState<string>(localStorage.getItem('hideImage') || 'true');

    // updates image visibility when hideImage is modified
    useEffect(() => {
        const setHideImage = async () => setHidden(localStorage.getItem('hideImage') || 'true');

        addEventListener('storage', setHideImage)

        return () => removeEventListener('storage', setHideImage);
    }, []);

    return (
        <div className='shrink-0 relative'>
            <div className={`${hidden === 'false' && 'opacity-0 hover:opacity-100'}`}>
                <div className="w-full h-full flex flex-col absolute z-20 font-Inter place-items-center place-content-center p-4 gap-2">
                    {hidden === 'true' &&
                        <>
                            <div className="flex text-white text-xl md:text-2xl font-bold items-center gap-2">
                                <IconEyeOff size="42" />
                                Sensitive Content
                            </div>
                            <p className="text-white text-center">
                                This image contains may include graphical depiction of a skin condition which some may find distressing or disturbing.
                            </p>
                        </>
                    }
                    <Button
                        variant="outline"
                        color="#FCF7F8"
                        size="md"
                        radius="md"
                        onClick={() => {
                            localStorage.setItem('hideImage', hidden === 'true' ? 'false' : 'true');
                            dispatchEvent(new Event('storage'));
                        }}
                    >
                        <p className="font-Inter text-white">
                            {hidden === 'true' ? 'Show' : 'Hide'}
                        </p>
                    </Button>
                </div>
                <Overlay className="absolute z-10" color="#CED3DC" blur={30} />
            </div>
            <img className="w-[320px] h-[240px]" src={src} />
        </div>
    );
}

export default Image;