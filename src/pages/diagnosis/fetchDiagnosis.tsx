import Result from '@/classes/Result'
import ResultsDB from '@/classes/ResultsDB'

//  DESC: Searchs results database for diagnosis associated with the given datetime.
// PARAM: datetime - Key for a diagnosis.
//  POST: Returns promise for the result associated with datetime; throws error if datetime does
//        not belong to a diagnosis in ResultsDB.
const fetchDiagnosis = async (datetime: number): Promise<Result> => {
    // index db using datetime
    const db: ResultsDB = new ResultsDB();
    const res: any = await db.results.get(datetime);

    // throw error if diagnosis does not exist
    if (!res) {
        throw Error();
    }

    return res;
}

export default fetchDiagnosis;