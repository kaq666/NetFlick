async function getDataForMovie(movieID) {
    fetch('http://localhost:3000/infos?id=' + movieID)
        .then((response) => response.json())
        .then((data) => {
            showInfosForMovie(movieID, data);
        })
        .catch(console.error);
}

function showInfosForMovie(movieID, data) {
    let movieDataCard = document.getElementById(movieID);

    for (var element in data) {
        let span = document.createElement('div')
        span.innerText = element + " : " + data[element];
        movieDataCard.firstElementChild.appendChild(span);
    }

    movieDataCard.setAttribute('hasData', true)
    movieDataCard.hidden = false
}

function movieTouched(movieID) {
    let movieDataCard = document.getElementById(movieID);

    if (movieDataCard.hidden && movieDataCard.getAttribute('hasData') == null) {
        getDataForMovie(movieID)
    } else {
        movieDataCard.hidden = !movieDataCard.hidden
    }
}