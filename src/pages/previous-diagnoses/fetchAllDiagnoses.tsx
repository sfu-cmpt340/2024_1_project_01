import Result from '@/classes/Result'
import ResultsDB from '@/classes/ResultsDB'

// DESC: Fetches all diagnoses availabe in the results db.
// POST: Returns a promise for an array of results; throws an error if no diagnoses are found.
const fetchAllDiagnoses = async (): Promise<Result[]> => {
    // grab all results from db
    const db: ResultsDB = new ResultsDB();
    const res: any = await db.results.toArray();

    // throw error if there are no diagnoses at the moment
    if (!res) {
        throw Error();
    }

    return res;
}

export default fetchAllDiagnoses;