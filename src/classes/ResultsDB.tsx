import Dexie from 'dexie'

import Result from '@/classes/Result'

// DESC: Stores diagnosis result data in a database.
export default class ResultsDB extends Dexie {
    results!: Dexie.Table<Result, number>;

    // DESC: Initializes a database for storing diagnosis.
    // POST: Returns a Dexie database.
    constructor() {
        super('ResultsDB');

        this.version(1).stores({
            results: 'datetime, image, conditions'
        });

        this.results.mapToClass(Result);
    }
}