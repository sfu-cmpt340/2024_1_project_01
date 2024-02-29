// DESC: Stores result data for a diagnosis.
export default class Result {
    // Unix time of when the user classified their image.
    datetime: number;
    // A base64 string containing the user's classified image.
    image: string;
    // A map that stores the names and probabiltiies of conditions present in the user's image.
    conditions: Map<string, number>;

    // DESC: Creates a new object to store diagnostic results.
    constructor(datetime: number, image: string, conditions: Map<string, number>) {
        this.datetime = datetime;
        this.image = image;
        this.conditions = conditions;
    }
}