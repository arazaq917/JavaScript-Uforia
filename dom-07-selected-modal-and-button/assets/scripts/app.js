const addMovieModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const startAddMovieButton = document.querySelector('header button');
const cencelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const confirmAdMovieBtn = cencelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextData = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
// const startAddMovieButton = document.querySelector('header').lastElementChild;

const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
}


const showMovieModalHandler = () => {
    addMovieModal.classList.add('visible')
    toggleBackdrop();
};

const updateUI = () => {
    if(movies.length === 0){
        entryTextData.style.display = 'block';
    } else {
        entryTextData.style.display = 'none';
    }
}

const clearInput = () =>{
    for(const inputVal of userInputs ){
        inputVal.value = '';
    }
}

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
}

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for(const movie of movies){
        if(movie.id === movieId){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list')
    listRoot.children[movieIndex].remove();
    // listRoot.removeChild(listRoot.children[movieIndex]);
    closeMovieDeletionModal();
}

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cencelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
    // confirmDeletionBtn.removeEventListener('click', deleteMovieHandler.bind(null, movieId)); //Not working Properly

    confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionBtn.addEventListener('click', deleteMovieHandler.bind(null, movieId));
    cencelDeletionBtn.removeEventListener('click', closeMovieDeletionModal)
    cencelDeletionBtn.addEventListener('click', closeMovieDeletionModal);
}

const renderNewMovie = (id, title, imgUrl, rating, descreption) => {
    const newMovie = document.createElement('li');
    newMovie.className = 'movie-element';
    newMovie.innerHTML = `
    <div class = "movie-element__image">
        <img src = "${imgUrl}" alt = ${title}>
    </div>
    <div class = "movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
        <h5>${descreption}</h5>
    </div>
    `;
    newMovie.addEventListener('click', startDeleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list')
    listRoot.append(newMovie);
}

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imgUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    const descreptionValue = userInputs[3].value;

    if(titleValue.trim() === '' || imgUrlValue.trim()==='' || ratingValue.trim() === '' || ratingValue < 1 || ratingValue > 6){
        alert( "Enter Valid Input and rating between 1 to 5" );
        return;
    }
    const newMovie =  {
        id: Math.random().toString(),
        title: titleValue,
        imgUrl: imgUrlValue,
        rating: ratingValue,
        desc:descreptionValue
    }
    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearInput();
    renderNewMovie(newMovie.id, newMovie.title, newMovie.imgUrl, newMovie.rating, newMovie.desc );
    updateUI();
}


const backDropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
};

const cencelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearInput();
};

startAddMovieButton.addEventListener('click', showMovieModalHandler);
backdrop.addEventListener('click', backDropClickHandler);
cencelAddMovieBtn.addEventListener('click', cencelAddMovieHandler);
confirmAdMovieBtn.addEventListener('click', addMovieHandler);
