import { useState } from 'react'

const App: React.FC = () => {
    const [data, setData] = useState<JSON | null>(null);

    return (
      <>
        <button onClick={() => {
            fetch('/classify').then(
                async (res: Response) => setData(await res.json())
            );
        }}>
            test classify call
        </button>
        <p>
            classify return data: {data && (data as any)['data']}
        </p>
      </>
    );
}

export default App;
