//store all books here
let myLibrary = [];

const theHobbit = new Book(1,"The Hobbit", "JRR Tolkien", 295, true);
const toKill = new Book(2,"To Kill a Mockingbird", "Harper Lee", 281, true);
const hotZone = new Book(3, "Hot Zone", "Richard Preston", 420, true);
const statusAnxiety = new Book(4, "Status Anxiety", "Alain de Botton", 320, true);

myLibrary.push(theHobbit);
myLibrary.push(toKill);
myLibrary.push(hotZone);
myLibrary.push(statusAnxiety);

//isnt this an object
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
//refactor this
function bookAdministration(){
    const container = document.querySelector(".card-container");

    myLibrary.forEach((book, i) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.classList.add("card-" + i);
        container.appendChild(cardDiv);
    
        const card = document.querySelector(".card-"+ i);

        let pTitle = document.createElement("p");

        //Make this a function (?) appendText function
        //create p tags and append
        let pAuthor = document.createElement("p");
        let pPages = document.createElement("p");
        let pRead = document.createElement("p");


        const titleText = document.createTextNode(book.title);
        pTitle.appendChild(titleText);
        card.appendChild(pTitle);
        
        const authorText = document.createTextNode(book.author);
        pAuthor.appendChild(authorText);
        card.appendChild(pAuthor);

        const pagesText = document.createTextNode(book.pages);
        pPages.appendChild(pagesText);
        card.appendChild(pPages);

        let hasReadText;
        if(book.hasRead ) {
             hasReadText = document.createTextNode("yes");
        }
        else {
             hasReadText = document.createTextNode("not yet");
        }
        pRead.appendChild(hasReadText);
        card.appendChild(pRead);

        //create remove button and append
        let button = document.createElement("button");
        button.dataset.arrayIndex = i;
        button.textContent = "Remove";
        card.appendChild(button);
        button.className= 'index-' + i;

        button.addEventListener('click', deleteBook);
    })}




//function appendText(){}

//function createCard(){}


function deleteBook(event, id){
    console.log(event.target.getAttribute('data-array-index'));
    console.log(event.id)
    const classname = event.srcElement.className;
    const index = classname.match(/\d/g).join('');

    //remove from array 
    myLibrary.splice(index, 1);
    console.log(myLibrary);

    //remove from display
    const card = document.querySelector('.card-' + index);
    card.remove();
}
//appendEventListener(buttonClass, e){}

//toggleHasRead(){}

//use this for adding new book's ID
function getMaxID(arr){
    const idList = arr.map(object => {return object.id});
    const maxID = Math.max(...idList);
    return maxID;
}

bookAdministration();
