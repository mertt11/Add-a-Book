const button = document.getElementById("addBut");
const modal = document.getElementById("modal");
const cancel = document.getElementById("cancel");
const form = document.getElementById("form");
const gridArea = document.querySelector('.grid-area');

const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
function addBookToLibrary(book) {
  myLibrary.push(book);
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
  const count=myLibrary.reduce((sum)=>(sum+1),0);
  totalBooks.textContent=count; 
}
function updateTotalReadBooks(){
  const readBooks=document.getElementById('readBooks');
  const countTrue=myLibrary.filter((book)=>book.isRead===true);
  readBooks.textContent=countTrue.length;
}
function updateTotalReadPages(){
  const totalPages=document.getElementById('totalPages');
  const filteredReadBooks=myLibrary.filter((book)=>book.isRead===true);
  const countReadPages=filteredReadBooks.reduce((sum,current) => 
    sum+parseInt(current.pages,10),0);
  totalPages.textContent=countReadPages; 
}

function check(){
  updateTotalReadPages(); 
  updateTotalBookCount();
  updateTotalReadBooks(); 
}

function delCardFromArray(bookTitle){
  const indexToRemove=myLibrary.findIndex(book => (book.title===bookTitle));
  myLibrary.splice(indexToRemove,1);
  check();
}

function appendOnScreen(book) {

  const card = document.createElement("div");
  const title = document.createElement("div");
  const author = document.createElement("div");
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
  card.appendChild(title);
  card.appendChild(author);
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

  readBut.onclick=toggleRead;
  removeBut.onclick=removeBook;

/*    readBut.onclick = () =>{
    if(readBut.classList.contains('bookisRead')){
      readBut.classList.remove('bookisRead');
      readBut.textContent='Not Read';
      readBut.classList.add('bookisNotRead');
      book.isRead=false;
      updateTotalReadBooks();
      updateTotalReadPages(); 
    }else{
      readBut.classList.remove('bookisNotRead');
      readBut.textContent='Read';
      readBut.classList.add('bookisRead');
      book.isRead=true;
      updateTotalReadBooks();
      updateTotalReadPages(); 
    } 
   }; 

  removeBut.onclick = () =>{
    const parent = removeBut.parentNode;
    const titleValue = parent.dataset.title;
    delCardFromArray(titleValue); 
    parent.remove();
  };  */
  
  check();
}

/* function toggleRead = (e) =>{

  readBut.onclick = () =>{
    if(readBut.classList.contains('bookisRead')){
      readBut.classList.remove('bookisRead');
      readBut.textContent='Not Read';
      readBut.classList.add('bookisNotRead');
      book.isRead=false;
      updateTotalReadBooks();
      updateTotalReadPages(); 
    }else{
      readBut.classList.remove('bookisNotRead');
      readBut.textContent='Read';
      readBut.classList.add('bookisRead');
      book.isRead=true;
      updateTotalReadBooks();
      updateTotalReadPages(); 
    } 
   };
} */

function getBookFromInput(){
  const bookAuthor = document.getElementById("book-author");
  const bookTitle = document.getElementById("book-title");
  const bookPages = document.getElementById("book-pages");
  const isRead = document.getElementById("check");
  return new Book(bookAuthor.value, bookTitle.value, bookPages.value,isRead.checked);
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const book = getBookFromInput();

  addBookToLibrary(book);
  appendOnScreen(book);

  resetInputs();
  closeModal();
});


 