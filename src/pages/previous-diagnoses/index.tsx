import { useEffect, useState } from 'react'

import Result from '@/classes/Result'
import Header from '@/components/Header'
import DiagnosisCard from '@/pages/previous-diagnoses/DiagnosisCard'
import fetchAllDiagnoses from '@/pages/previous-diagnoses/fetchAllDiagnoses'

// DESC: Displays the users previous diagnoses; allows them to view more details about the
//       diagnosis or delete them.
const PreviousDiagnoses: React.FC = () => {
    const [results, setResults] = useState<Result[]>([]);
    const [update, setUpdate] = useState<any>(null);

    // get all diagnoses from database
    useEffect(() => {
        fetchAllDiagnoses()
            .then((res: any) => {
                // on success
                if (res) {
                    setResults(res);
                }
            })
            .catch(() => {
                // on fail
                console.log('error');
            });
    }, [update]);
    // update is 'modified' in the diagnosis card whenever a diagnosis is deleted 
    
    // sort results by most recent then generates diagnosis cards
    const diagnoses: JSX.Element[] = results
        .sort((a: Result, b: Result): number => b.datetime - a.datetime)
        .map((diagnosis: Result) => {
            return (
                <div className="flex-1" key={diagnosis.datetime}>
                    <DiagnosisCard diagnosis={diagnosis} setUpdate={setUpdate} />
                </div>
            );
        });

    return (
        <>
            <div className="bg-white">
                <Header />
                <div className="flex bg-blue font-Inter text-white">
                    <div className="flex flex-col my-[6rem] mx-[15rem] gap-4">
                        <p className="font-bold text-2xl">
                            View your previous diagnoses.
                        </p>
                        <p>
                            Results are sorted by most recently diagnosed.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col mx-[15rem] my-10 gap-10">
                    {diagnoses}
                </div>
            </div>
        </>
    );
}

export default PreviousDiagnoses;