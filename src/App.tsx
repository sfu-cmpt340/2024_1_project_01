import { useState } from 'react'

const App: React.FC = () => {
    const [image, setImage] = useState<string>('');
    const [imageURL, setImageURL] = useState<string>('');
    
    const [data, setData] = useState<JSON | null>(null);

    return (
      <>
        {image 
            ? <div>
                <img src={image} /> 
                <button 
                    onClick={() => setImage('')}
                >
                    remove image
                </button>
            </div>
            : <div>
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
                    <img src={image} />
                </div>
            </div>
        }
        <div>
            <button 
                onClick={() => {
                    fetch('/classify')
                        .then(async (res: Response) => setData(await res.json()));
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

export default App;
