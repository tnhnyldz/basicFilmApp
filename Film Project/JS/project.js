const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//load all events
eventListeners();
function eventListeners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    //returns array and send it to load functıon ın uı
    let films = Storage.getFilmsFromStorage();
    UI.loadAllFilms(films);
  });
  cardBody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}

function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;
  if (title === "" || director === "" || url === "") {
    // error
    UI.displayMessages("Tüm alanları doldurun...", "danger");
  } else {
    //new film
    const newFilm = new Film(title, director, url);
    UI.addFilmToUI(newFilm); //add film to ui
    Storage.addFilmToStorage(newFilm); //add film to storage
    UI.displayMessages("Film basarıyla yuklendı", "success");
  }
  //clear elements
  UI.clearInputs(titleElement, directorElement, urlElement);
  e.preventDefault();
}
function 
deleteFilm(e) {
  console.log(e.target);
  if (e.target.id === "delete-film") {
    UI.deleteFilmFromUI(e.target);
    Storage.deleteFilmFromStorage(
      // gets title
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );
    UI.displayMessages("Silme işlemi başarılı...", "success");
  }
  e.preventDefault();
}
function clearAllFilms() {
  if (confirm("emin misiniz")) {
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
  } 
}
