//store all books here
let myLibrary = [];

const theHobbit = new Book(1,"The Hobbit", "JRR Tolkien", 295, true);
const toKill = new Book(2,"To Kill a Mockingbird", "Harper Lee", 281, false);
const hotZone = new Book(3, "Hot Zone", "Richard Preston", 420, true);
const statusAnxiety = new Book(4, "Status Anxiety", "Alain de Botton", 320, true);

myLibrary.push(theHobbit);
myLibrary.push(toKill);
myLibrary.push(hotZone);
myLibrary.push(statusAnxiety);

function Book(id,title,author,pages,hasRead){
    //constructor
    this.id = id,
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.hasRead = hasRead,
    this.info = function(){
        return `The ${title} by ${author}, ${pages} pages, ${hasRead} read`;
    }
}

//clear display of card-container
function removeAllChildNodes(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function bookAdministration(){
    const container = document.querySelector(".card-container");

    removeAllChildNodes(container);

    myLibrary.forEach((book) => {
        
        createCard(book);
        
        let flag = document.querySelector('.flag');
        flag.addEventListener('click', createHasReadListener('.flag',book));
    })
}

function createAppendElement(parentElement, elementType, elementClassName = '', text=''){
    const parent = document.querySelector(parentElement);
    const element = document.createElement(elementType);
    element.classList.add(elementClassName);
    
    element.appendChild(document.createTextNode(text))
    parent.appendChild(element);
}

function createCard(item){
    createAppendElement(".card-container","div", 'card-' + item.id);

    const card = document.querySelector('.card-' + item.id);
    card.classList.add('card');

    createAppendElement(".card-" + item.id, "p", "title", item.title);

    createAppendElement(".card-" + item.id, "p", "author", item.author);

    createAppendElement(".card-" + item.id, "p", "page-number" ,`${item.pages} pages`);

    createFlag(item);

    //create remove button and append
    let removeButton = document.createElement("button");
    //card.appendChild(removeButton); 
    
    removeButton.dataset.bookId = item.id;
    
    removeButton.textContent = "Remove";

    removeButton.className = 'remove-btn fa-solid fa-circle-xmark index-' + item.id;

}

function createFlag(item){

    const container = document.querySelector('.card-'+ item.id)
    const pRead = document.createElement("p");
    pRead.classList.add("read-status")

    const hasReadDiv = document.createElement("div");
    const pTitleRead = document.createElement("p");
    const readHeader = document.createTextNode('Read')
    pTitleRead.appendChild(readHeader);
    hasReadDiv.appendChild(pTitleRead);

    const pReadText = document.createElement("p");
    const icon = document.createElement("i");
    
    if(item.hasRead ) {
        pReadText.appendChild(icon).className ="fa-solid fa-check";            

        hasReadDiv.className ='flag btn read flag-' +item.id;
    }
    else {
        hasReadDiv.className ='flag btn not-read flag-' +item.id;
        pReadText.appendChild(icon).className ="fa-solid fa-question";            
    }

    hasReadDiv.appendChild(pReadText);
    container.appendChild(hasReadDiv);
}

function createHasReadListener(elementClassName, item){
   
    let element = document.querySelector(elementClassName + '-'+item.id);
    const parentContainer = document.querySelector('.card-' + item.id);
    var icon = parentContainer.getElementsByTagName('i');
   
    element.addEventListener('click', (e) => {
      
        if(item.hasRead){
            item.hasRead = false;
            icon[0].className = 'fa-solid fa-question';
            element.className = 'flag btn not-read ';
        }

        else{
            item.hasRead = true;
            icon[0].className = 'fa-solid fa-check';
            element.className = 'flag btn read flag';
        }
    });
}

function createRemoveBookListener(elementClassName, bookObject){
    const element = document.querySelector(elementClassName);
    element.addEventListener('click',  (e) => {
        const matchIndex = myLibrary.findIndex((i) =>{
            return i.id == bookObject.id;
        } )
              
        //remove from array 
        myLibrary.splice(matchIndex, 1);
    
        //remove from display
        const card = document.querySelector('.card-' + bookObject.id);
        card.remove();
    });
}

//use this for adding new book's ID
function getMaxID(arr){
    const idList = arr.map(object => {return object.id});
    const maxID = Math.max(...idList);
    return maxID;
}

// display or hide form modal
function toggleModal(displayModalStatus) {
    if(displayModalStatus){
        toggleCSSValidation('title', false);
        toggleCSSValidation('author', false)
        toggleCSSValidation('pages', false)
        document.querySelector('#form-modal').style.display = 'block';  
    }
    else{
        document.querySelector('#form-modal').style.display = 'none';  
    }
}

function addBook(event){
    event.preventDefault();

    const form = document.getElementById('form');
    const formData = new FormData(form);

    const newID = getMaxID(myLibrary) + 1;
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('page-number');
    const hasRead = formData.get('has-read');

    //validation
    let formIsValid = checkValidation();
    if (!formIsValid) return;
    
    const newBook = new Book(newID,title, author, pages, hasRead);
    myLibrary.push(newBook); 

    toggleModal(false);
    form.reset();

    bookAdministration();
}

function checkValidation(){
    const form = document.getElementById('form');
    const formData = new FormData(form);

    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('page-number');

    if(title === ''){
        toggleCSSValidation('title', true);
        return false;
    }
    if(author === ''){
        toggleCSSValidation('title', false);
        toggleCSSValidation('author', true);
        return false;
    }
    if(pages === ''){
        toggleCSSValidation('title', false);
        toggleCSSValidation('author', false);
        toggleCSSValidation('pages', true);
        return false;
    }
    return true;
}

function toggleCSSValidation(element, displayStatus){
    const span = document.querySelector(`span.${element}-message.invalid`);

    if(!displayStatus) {
        span.style.display = 'none';
        span.style.visibility = 'hidden';
    }
    else {
        span.style.display = 'inline';
        span.style.visibility = 'visible';
    }
}

let modalOpenButton = document.querySelector('.modal-button');
modalOpenButton.addEventListener("click", function(){
    toggleModal(true);
});

let modalClose = document.querySelector('span.exit-button');
modalClose.addEventListener('click', function() {
    toggleModal(false);
})

let submitButton = document.querySelector('#submit-button');
submitButton.addEventListener('click', addBook);

bookAdministration();