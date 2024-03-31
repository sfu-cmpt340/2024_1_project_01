import { useState } from 'react'

import Header from '@/components/Header'
import ImageDisplay from '@/pages/classifier/ImageDisplay'
import ImageInput from '@/pages/classifier/ImageInput'

// DESC: Allows users to diagnose skin conditions from their own images.
const Classifier: React.FC = () => {
    const [image, setImage] = useState<string>('');

    return (
        <div className="min-w-screen min-h-screen bg-white">
            <Header />
            {!image 
                ? <div className="py-16 md:py-24">
                    <ImageInput setImage={setImage} />
                </div>
                : <div className="py-8">
                    <ImageDisplay image={image} setImage={setImage} />
                </div>    
            }
        </div>
    );
}

export default Classifier;