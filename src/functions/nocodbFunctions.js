import axios from 'axios';

const token = import.meta.env.NOCODB_API_KEY;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function GetRandomMoviesFromNoco(numberOfMovies = 50) {
    const options = {
        method: 'GET',
        url: 'https://app.nocodb.com/api/v2/tables/m5oordes0uyi6nb/records',
        params: {
            offset: getRandomNumber(1, 7000),
            where: '',
            viewId: 'vw5derh4tisvaurd',
            limit: numberOfMovies
        },
        headers: {
            'xc-token': token
        }
    };

    try {
        const response = await axios.request(options);
        // console.log('In GetRandomMoviesFromNoco, received data:', response.data);
        return response.data;
    } catch (err) {
        console.error("Couldn't get movies from NOCODB:", err);
        return false;
    }
}

export async function GiveLinkForThisTMBDId(tmbdId) {

    const options = {
        method: 'GET',
        url: 'https://app.nocodb.com/api/v2/tables/m5oordes0uyi6nb/records',
        params: {
            //   where: `TMDb_ID=="${tmbdId}"`,
            //   where: `(TMDb_ID,eq,${tmbdId})`,
            // where: `"Title"=="Steamboat Willie"`,
            where: `(TMDb_ID,eq,${Number(tmbdId).toFixed(1)})`,
            viewId: 'vw5derh4tisvaurd',
            limit: 1
        },
        headers: {
            'xc-token': token
        }
    };

    try {
        const response = await axios.request(options);
        console.log('In GiveLinkForThisTMBDId, received data:', response.data);
        return response.data;
    } catch (err) {
        console.error("Couldn't get movies from NOCODB:", err);
        return false;
    }
}

export async function SearchForMoviesOnNoCo(searchQuery, limit = 15) {
    const options = {
        method: 'GET',
        url: 'https://app.nocodb.com/api/v2/tables/m5oordes0uyi6nb/records',
        params: {
            where: `(Title,like,%${searchQuery}%)`,
            viewId: 'vw5derh4tisvaurd',
            limit: limit
        },
        headers: {
            'xc-token': token
        }
    };

    try {
        const response = await axios.request(options);
        console.log('In SearchForMoviesOnNoCo, received data:', response.data);
        return response.data;
    } catch (err) {
        console.error("Couldn't get movies from NOCODB:", err);
        return false;
    }
}