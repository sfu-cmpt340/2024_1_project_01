import { Pagination } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Result from '@/classes/Result'
import Header from '@/components/Header'
import DiagnosisCard from '@/pages/previous-diagnoses/DiagnosisCard'
import fetchAllDiagnoses from '@/pages/previous-diagnoses/fetchAllDiagnoses'

// DESC: Displays the users previous diagnoses; allows them to view more details about the
//       diagnosis or delete them.
const PreviousDiagnoses: React.FC = () => {
    const [results, setResults] = useState<Result[]>([]);
    const [update, setUpdate] = useState<any>(null);

    const [page, setPage] = useState<number>(1);

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
    
    // sort results by most recent then generates diagnosis cards depending on the page
    const diagnoses: JSX.Element[] = results
        .sort((a: Result, b: Result): number => b.datetime - a.datetime)
        .slice((page-1)*10, (page-1)*10 + 10)
        .map((diagnosis: Result) => {
            return (
                <div className="flex-1" key={diagnosis.datetime}>
                    <DiagnosisCard diagnosis={diagnosis} setUpdate={setUpdate} />
                </div>
            );
        });

    return (
        <>
            <div className="min-w-screen min-h-screen bg-white">
                <Header />
                <div className="flex bg-blue font-Inter text-white">
                    <div className="flex flex-col my-12 md:my-24 mx-4 md:mx-20 lg:mx-40 xl:mx-60 gap-4">
                        <p className="font-bold text-2xl">
                            View your previous diagnoses
                        </p>
                        <p className="text-justify md:text-left">
                            Your results are shown below and are sorted by most recently diagnosed.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col my-[4.5rem]  mx-4 md:mx-20 lg:mx-40 xl:mx-60 gap-10">
                    {diagnoses.length 
                        ? diagnoses
                        : <p className="font-Inter text-center">
                            There are currently no diagnoses saved.&nbsp;
                            <Link className="text-lightblue" to="/classifier"> 
                                Click here to get started.
                            </Link>
                        </p>
                    }
                </div>
                <div className="flex place-content-center p-6">
                    <Pagination
                        className="font-Inter"
                        total={Math.ceil(results.length / 10)}
                        color="#3943B7"
                        radius="md"
                        value={page}
                        onChange={setPage}
                    />
                </div>
            </div>
        </>
    );
}

export default PreviousDiagnoses;