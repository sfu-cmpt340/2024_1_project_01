import { useState } from 'react'

import Header from '@/components/Header'
import ImageDisplay from '@/pages/classifier/ImageDisplay'
import ImageInput from '@/pages/classifier/ImageInput'

// DESC: Allows users to diagnose skin conditions from their own images.
const Classifier: React.FC = () => {
    const [image, setImage] = useState<string>('');

    return (
        <>
            <div className="h-screen w-screen bg-white relative">
                <Header />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {image 
                        ? <ImageDisplay image={image} setImage={setImage} />
                        : <ImageInput setImage={setImage} />
                    }
                </div>
            </div>
        </>
    );
}

export default Classifier;