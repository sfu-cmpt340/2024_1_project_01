interface ConditionCardProps {
    probability: number;
    condition: string;
}

// DESC: Generates a card with information about the condition.
//  PRE: condition - A json file containing its condition information exists.
const ConditionCard: React.FC<ConditionCardProps> = ({ probability, condition }) => {
    return (
        <div className="font-bold">
            {condition.replace(/_/g, ' ')} - {probability.toFixed(2)}%
        </div>
    );
}

export default ConditionCard;