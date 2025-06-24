export async function getMovieLinkFromName(movieTitle) {
    let queriedMovieTitle = ((movieTitle.replace(' ', '+')).replace('(', '%28')).replace(')', '%')


    let URL = `https://archive.org/advancedsearch.php?output=json&q=title%3A%28${queriedMovieTitle}29%29+AND+mediatype%3A%28movies%29&rows=1&fl[]=identifier&sort[]=-downloads`

    let networkRequest = await fetch(URL);
    networkRequest = await networkRequest.json();
    console.log(networkRequest);
}