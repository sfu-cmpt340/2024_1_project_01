//  DESC: Classifies the skin conditions present in the users image.
//   PRE: image is a valid image.
// PARAM: image - An image stored in a base64 string.
//  POST: Returns promise for results from classifying the user's image.
const classifyImage = async (image: string): Promise<JSON> => {
    const classifyResult: Promise<JSON> = fetch('/classify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            'image': image
        })

    })
        .then((res: Response) => res.json());
    
    return classifyResult;
}

export default classifyImage;