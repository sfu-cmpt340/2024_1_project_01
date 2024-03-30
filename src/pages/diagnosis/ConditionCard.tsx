import useSWR from 'swr'

import Image from '@/components/Image'
import { Alert } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

interface ConditionCardProps {
    probability: number;
    condition: string;
}

//  DESC: Generates a card with information about the condition.
//   PRE: A json file exists containing the information on the provided condition.
// PARAM: probability - Probability of the condition that may be present in the user's image.
//        condition - Name of the condition that may be present in the user's image.
const ConditionCard: React.FC<ConditionCardProps> = ({ probability, condition }) => {
    // fetch information about condition
    const fetcher = (path: string) => fetch(path).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`/condition_data/${condition}.json`, fetcher)

    // load lists
    const possibleCauses: JSX.Element[] = !(isLoading || error) && data['possible causes'].map((cause: string) => {
        return (
            <li key={condition + cause}>
                {cause}
            </li>
        );
    });

    const symptoms: JSX.Element[] = !(isLoading || error) && data['symptoms'].map((symptom: string) => {
        return (
            <li key={condition + symptom}>
                {symptom}
            </li>
        );
    });

    const treatments: JSX.Element[] = !(isLoading || error) && data['treatments'].map((treatment: string) => {
        return (
            <li key={condition + treatment}>
                {treatment}
            </li>
        );
    });

    return (
        <div className="flex flex-col font-Inter">
            <p className="text-xl font-bold py-4 lg:py-0">
                {condition.replace(/_/g, ' ')} - {probability.toFixed(2)}%
            </p>
            <div className="flex flex-col-reverse lg:flex-row gap-8 items-center lg:items-start">
                {!error
                    ? <div className="flex flex-col">
                        <p className="text-justify">
                            {!isLoading && data['description']}
                        </p>
                        <div className="my-4">
                            <p className="text-md font-bold">
                                Possible Causes
                            </p>
                            <ul className="list-disc list-inside">
                                {possibleCauses}
                            </ul>
                            <p className="text-md font-bold">
                                Symptoms
                            </p>
                            <ul className="list-disc list-inside">
                                {symptoms}
                            </ul>
                            <p className="text-md font-bold">
                                Treatments
                            </p>
                            <ul className="list-disc list-inside">
                                {treatments}
                            </ul>
                        </div>
                    </div>
                    : <Alert
                        className="font-Inter text-white my-4 w-full h-1/4"
                        variant="filled"
                        color="#DB5461"
                        title="Error"
                        icon={ <IconAlertTriangle className="text-white" />}
                    >
                        <p className="font-Inter text-white text-justify">
                          The information for this condition could not be loaded.
                        </p>
                    </Alert>
                }
                <Image src={`/condition_images/${condition}.jpg`} />
            </div>
        </div>
    );
}

export default ConditionCard;