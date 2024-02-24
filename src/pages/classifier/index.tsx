import { useState } from 'react'

import classifyImage from './classifyImage'
import ImageDisplay from '@/pages/classifier/ImageDisplay'
import ImageInput from '@/pages/classifier/ImageInput'

// DESC: Allows users to diagnose skin conditions from their own images.
const Classifier: React.FC = () => {
    const [image, setImage] = useState<string>('');
    
    const [data, setData] = useState<JSON | null>(null);

    return (
        <>
            {image 
                ? <ImageDisplay image={image} setImage={setImage} />
                : <ImageInput setImage={setImage} />
            }
            <div>
                <button 
                    onClick={() => {
                        classifyImage(image)
                            .then((res: JSON) => setData(res));
                    }}
                >
                    classify
                </button>
                <p>
                    result from classify: {data && (data as any)['data']}
                </p>
            </div>
        </>
    );
}

export default Classifier;