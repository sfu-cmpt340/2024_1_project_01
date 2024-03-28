import { Button, Progress, Tooltip } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IconListDetails, IconTrash } from '@tabler/icons-react'

import Result from '@/classes/Result'
import ResultsDB from '@/classes/ResultsDB'

interface DiagnosisCardProps {
    diagnosis: Result;
    setUpdate: React.Dispatch<React.SetStateAction<any>>;
}

//  DESC: A card with some brief information about a previous diagnosis and has buttons to see more
//        details or delete it.
//   PRE: diagnosis exists and is a valid Result object.
// PARAM: diagnosis - The diagnosis for the card.
//        setUpdate - A setter from the PreviousDiagnoses page that tells it to update the list of
//                    diagnoses when one is deleted.
//  POST: Diagnosis is deleted from the results database if the user presses delete.
const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ diagnosis, setUpdate }) => {
    const date: Date = new Date(diagnosis.datetime);

    // get probabilities of conditions
    const conditionIter: IterableIterator<[string, number]> = diagnosis.conditions.entries();
    const condition1: [string, number] = conditionIter.next().value;
    const condition2: [string, number] = conditionIter.next().value;
    const condition3: [string, number] = conditionIter.next().value;
    const other: number = 100 - condition1[1] - condition2[1] - condition3[1];

    return (
        <div className="flex flex-col border-4 border-grey rounded-md font-Inter font-bold text-black">
            <p className="text-2xl mx-6 my-4 text-center md:text-left">
                {date.toLocaleString('en-us', { 
                    hour: 'numeric', 
                    minute: 'numeric' })
                + ' - ' + date.toLocaleString('en-us', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                })}
            </p>
            <div className="flex flex-col md:flex-row mx-6 mb-4 items-center md:items-stretch">
                <img className="w-[240px] h-[180px]" src={diagnosis.image} />
                <div className="w-full flex flex-col md:ml-6 items-center">
                    <Progress.Root 
                        className="w-[80%] md:w-full my-4 md:my-0"
                        radius="md" 
                        size={15}
                        >
                        <Tooltip 
                            className="font-Inter text-white" 
                            color="#FF4242" 
                            label={`${condition1[0].replace(/_/g, ' ')} (${condition1[1].toFixed(2)}%)`}
                        >
                            <Progress.Section value={condition1[1]} color="#FF4242" />
                        </Tooltip>
                        <Tooltip 
                            className="font-Inter text-white" 
                            color="#58BC82" 
                            label={`${condition2[0].replace(/_/g, ' ')} (${condition2[1].toFixed(2)}%)`}
                        >
                            <Progress.Section value={condition2[1]} color="#58BC82" />
                        </Tooltip>
                        <Tooltip 
                            className="font-Inter text-white" 
                            color="#FCBF49" 
                            label={`${condition3[0].replace(/_/g, ' ')} (${condition3[1].toFixed(2)}%)`}
                        >
                            <Progress.Section value={condition3[1]} color="#FCBF49" />
                        </Tooltip>
                        <Tooltip 
                            className="font-Inter text-white" 
                            color="#3C91E6" 
                            label={`Other (${other.toFixed(2)}%)`}
                        >
                            <Progress.Section value={other} color="#3C91E6" />
                        </Tooltip>
                    </Progress.Root>
                    <div className="self-stretch flex-1 flex flex-col xl:flex-row gap-4 xl:gap-8 items-center xl:items-end place-content-end">
                        <Button
                            className="w-[80%] lg:w-[55%] xl:w-[32.5%]"
                            variant="filled"
                            color="#3943B7"
                            size="lg"
                            radius="md"
                            leftSection={<IconListDetails className="text-white" size="32" />}
                            component={Link}
                            to={`/diagnosis/${diagnosis.datetime}`}
                        >
                            <p className="font-Inter font-bold text-white text-xl">
                                View Details
                            </p>
                        </Button>
                        <Button
                            className="w-[80%] lg:w-[55%] xl:w-[32.5%]"
                            variant="filled"
                            color="#DB5461"
                            size="lg"
                            radius="md"
                            leftSection={<IconTrash className="text-white" size="32" />}
                            onClick={() => {
                                // delete diagnosis from database
                                const db: ResultsDB = new ResultsDB();
                                db.results.delete(diagnosis.datetime);

                                // call PreviousDiagnoses page to reflect changes
                                setUpdate({});
                            }}
                        >
                            <p className="font-Inter font-bold text-white text-xl">
                                Delete
                            </p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiagnosisCard;