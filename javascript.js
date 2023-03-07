const button = document.getElementById("addBut");
const modal = document.getElementById("modal");
const cancel = document.getElementById("cancel");
const form = document.getElementById("form");
const gridArea = document.querySelector('.grid-area');

const myLibrary = [];

/* function Book(author,title,pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
} */
class Book{
  constructor(author,title,pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
  }
  
}

function isInLibrary(checkBook){
  return myLibrary.some(obj => obj.title === checkBook.title);
}

function addBookToLibrary(book) {
  if(!isInLibrary(book)){
    myLibrary.push(book);
  }
}

function resetInputs() {
  form.reset();
}
function closeModal() {
  resetInputs();
  modal.style.display = "none";
}

button.onclick = () => {
  modal.style.display = "block";
};
cancel.onclick = (e) => {
  e.preventDefault();
  resetInputs();
  closeModal();
};

function updateTotalBookCount(){
  const totalBooks=document.getElementById('totalBooks'); 
  totalBooks.textContent=myLibrary.reduce((sum)=>sum+1,0);
}
function updateTotalReadBooks(){
  const readBooks=document.getElementById('readBooks');
  const countTrue=myLibrary.filter((book)=>book.isRead===true);
  readBooks.textContent=countTrue.length;
}
function updateTotalReadPages(){
  const totalPages = document.getElementById("totalPages");
  const countReadPages = myLibrary
    .filter((book) => book.isRead)
    .reduce((sum, { pages }) => sum + parseInt(pages, 10), 0);
  totalPages.textContent = countReadPages;
}


function delCardFromArray(bookTitle){
  const indexToRemove=myLibrary.findIndex(book => (book.title===bookTitle));
  myLibrary.splice(indexToRemove,1);
  updateTotalReadPages(); 
  updateTotalBookCount();
  updateTotalReadBooks(); 
}

function createCard(book) {

  const card = document.createElement("div");
  const author = document.createElement("div");
  const title = document.createElement("div");
  const pages = document.createElement("div");
  const readBut=document.createElement('button');
  const removeBut=document.createElement('button');
  
  card.setAttribute('data-title', book.title);

  card.classList.add('card');
  title.classList.add('title');
  author.classList.add('author');
  pages.classList.add('pages');
  readBut.classList.add('readBut');
  removeBut.classList.add('removeBut');
  removeBut.textContent='Remove'; 


  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;

  gridArea.appendChild(card);
  card.appendChild(author);
  card.appendChild(title);
  card.appendChild(pages);
  card.appendChild(readBut);
  card.appendChild(removeBut); 

  if(book.isRead){
    readBut.textContent='Read';
    readBut.classList.add('bookisRead');
  }else{
    readBut.textContent='Not Read';
    readBut.classList.add('bookisNotRead');
  }  


  const updateReadStatus = () => {
   book.isRead = !book.isRead;
    readBut.textContent = book.isRead ? "Read" : "Not Read";
    readBut.classList.toggle("bookisRead");
    readBut.classList.toggle("bookisNotRead");
    updateTotalReadBooks();
    updateTotalReadPages();
  };

  readBut.onclick = updateReadStatus;

  removeBut.onclick = () =>{
    const parent = removeBut.parentNode;
    const titleValue = parent.dataset.title;
    delCardFromArray(titleValue); 
    parent.remove();
  };  
  
  updateTotalReadPages(); 
  updateTotalBookCount();
  updateTotalReadBooks(); 
}

function getBookFromInput(){
  const bookAuthor = document.getElementById("book-author");
  const bookTitle = document.getElementById("book-title");
  const bookPages = document.getElementById("book-pages");
  const isRead = document.getElementById("check");
  return new Book(bookAuthor.value,bookTitle.value,bookPages.value,isRead.checked);
}

function clearError(){
  const errors=document.querySelectorAll('.error');
  errors.forEach(error => {
      error.classList.remove('active');
  });
}

function showError(errElement,errMsg){
  document.querySelector(`.${errElement}`).classList.add('active'); 
  document.querySelector(`.${errElement}`).innerHTML=errMsg;  
}

function checkErrors(){
  if(form.author.value===''){
    showError('book-author-error','You have to enter your books author');
     return false; 
  }
  if(form.title.value===''){
    showError('book-title-error','You have to enter your book title');
     return false; 
  }

  if (myLibrary.some(book => book.title === form.title.value)) {
    showError('book-title-error','You have this book in your library');
    return false; 
  } 
  

  if(form.pages.value===''){
    showError('book-pages-error','You have to enter your book pages');
     return false; 
  }
     return true; 
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const book = getBookFromInput();
  clearError();
 
  if(checkErrors()){
    addBookToLibrary(book);
    createCard(book);

    resetInputs();
    closeModal();
  }
  
});


 