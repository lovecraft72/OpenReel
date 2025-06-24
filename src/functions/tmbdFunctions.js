const API_KEY = 'aa9d37097e7e5c3cced034a46b882e12'


export async function fetchPublicDomainMovies(){
    let valToReturn = [];

    for (let i=1; i<8; i++){
        let p = await fetch(`https://api.themoviedb.org/3/list/8146-public-domain?api_key=${API_KEY}&page=${i}`)
        let q = await p.json();

        console.log(q.items)
        let tempArray = [...valToReturn, ...q.items]
        valToReturn = tempArray;
        // p.then((val) => {
        //     return val.json()
        // }).then((val) => {
        //     console.log(val.items)
        //     valToReturn = val.items;
        // })
    }
    
    console.log('ValToReturn :')
    console.log(valToReturn)
    return valToReturn
}

