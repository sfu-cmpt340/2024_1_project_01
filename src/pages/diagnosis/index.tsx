import { Alert, Button } from '@mantine/core'
import { useEffect, useState } from 'react'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import { IconAlertTriangle, IconTrash } from '@tabler/icons-react'

import Result from '@/classes/Result'
import ResultsDB from '@/classes/ResultsDB'
import Header from '@/components/Header'
import ConditionCard from '@/pages/diagnosis/ConditionCard'
import fetchDiagnosis from '@/pages/diagnosis/fetchDiagnosis'

// DESC: Displays information about the user's diagnosis based on their provided image.
const Diagnosis: React.FC = () => {
    const [results, setResults] = useState<Result>();
    const navigate: NavigateFunction = useNavigate();
    
    // grab datetime from url
    const params: any = useParams<{ datetime: string }>();
    const datetime: number = parseInt(params.datetime);
    const date: Date = new Date(datetime);

    // grab diagnosis from db
    useEffect(() => {
        fetchDiagnosis(datetime)
            .then((res: any) => {
                // on success
                if (res) {
                    setResults(res);
                }
            })
            .catch(() => {
                // on fail
                navigate('/*');
            });
    }, []);

    // create card for each condition
    let conditions: JSX.Element[] = new Array;
    results && results.conditions.forEach((probability: number, condition: string) => {
        conditions.push(<ConditionCard key={condition} probability={probability} condition={condition} />);
    });

    return (
        <div className="min-w-screen min-h-screen bg-white font-Inter">
            <Header />
            <div className="bg-blue text-white">
                <div className="flex flex-col mx-4 md:mx-20 lg:mx-40 xl:mx-60 py-8 md:py-16">
                    <p className="font-bold text-2xl text-center md:text-left">
                        {date.toLocaleString('en-us', { 
                            hour: 'numeric', 
                            minute: 'numeric' })
                        + ' - ' + date.toLocaleString('en-us', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                        })}
                    </p>
                    <div className="flex flex-col lg:flex-row gap-4 md:gap-8 items-center lg:items-start">
                        <div className="flex flex-col">
                            <p className="text-justify">
                                Based on your provided image, the following skin conditions were detected using our model.
                            </p>
                            <Alert
                                className="font-Inter text-white my-4"
                                variant="filled"
                                color="#DB5461"
                                title="Warning"
                                icon={ <IconAlertTriangle className="text-white" />}
                            >
                                <p className="font-Inter text-white text-justify">
                                    The results generated by Skintector is for educational purposes only. It is not a substitute for professional medical advice. Always seek the advice of your physician or other qualified healthcare professionals for any questions you may have regarding a medical condition. All information on skin conditions have been generated using ChatGPT.
                                </p>
                            </Alert>
                        </div>
                        <img className="shrink-0 w-[320px] h-[240px]" src={results && results.image} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col mx-4 md:mx-20 lg:mx-40 xl:mx-60 my-16 gap-4 md:gap-10">
                {conditions}
            </div>
            <div className="flex justify-end mx-4 md:mx-20 lg:mx-40 xl:mx-60 py-8">
                <Button
                    className="w-full md:w-[40%] lg:w-[25%]"
                    variant="filled"
                    color="#DB5461"
                    size="lg"
                    radius="md"
                    leftSection={<IconTrash className="text-white" size="32" />}
                    onClick={() => {
                        // delete diagnosis from database
                        const db: ResultsDB = new ResultsDB();
                        db.results.delete(datetime)

                        // redirect to previous diagnosis page
                        navigate('/previous-diagnosis')
                    }}
                >
                    <p className="font-Inter font-bold text-white text-xl">
                        Delete
                    </p>
                </Button>
            </div>
        </div>
    );
}

export default Diagnosis;