import json from '../jsonfiles/Json'




function fakeJson() {
    return new Promise(resolve => {
        // Resolve after a timeout so we can see the loading indicator
        setTimeout(
            () =>
                resolve({
                    json
                }),
            1000
        );
    });
}

export function fetchJson() {
    return dispatch => {
        dispatch(fetchBegin());
        return fakeJson()
            .then(json => {

                dispatch(fetchSuccess(json));
                return json;
            })
            .catch(error =>
                dispatch(fetchFailure(error))
            );
    };
}


export function downloadData(data, format) {

    const fields = [];
    const csvData = [];

   /* _.map(headers, h => fields.push(h.name));
    csvData.push(fields);

    for(var j=0;j<data.length;j++){
        const dataValue=[];
        for(var k=0;k<headers.length;k++){
            const headerName = headers[k].column;
            dataValue.push(data[j][headerName]);
        }
        csvData.push(dataValue);
    }*/

    for(let k in data[0])
        fields.push(k);


    for(var j=0;j<data.length;j++){
        const dataValue=[];
        for(var k=0;k<fields.length;k++){
            const headerName = fields[k];
            dataValue.push(data[j][headerName]);
        }
        csvData.push(dataValue);
    }


    return(
        csvData
    );
}

/*// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}*/

export const FETCH_BEGIN = "FETCH_BEGIN";
export const FETCH_SUCCESS =
    "FETCH_SUCCESS";
export const FETCH_FAILURE =
    "FETCH_FAILURE";

export const fetchBegin = () => ({
    type: FETCH_BEGIN
});

export const fetchSuccess = response => ({

    type: FETCH_SUCCESS,
    payload:response.json
});

export const fetchFailure = error => ({
    type: FETCH_FAILURE,
    payload: { error }
});
