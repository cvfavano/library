//store all books here
let myLibrary = [];

const theHobbit = new Book("The Hobbit", "JRR Tolkien", 295, true);
const toKill = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
const hotZone = new Book("Hot Zone", "Richard Preston", 420, true);
const status = new Book("Status Anxiety", "Alain de Botton", 320, true);

myLibrary.push(theHobbit);
myLibrary.push(toKill);
myLibrary.push(hotZone);

//isnt this an object
function Book(title,author,pages,hasRead){
    //constructor
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.hasRead = hasRead,
    this.info = function(){
        return `The ${title} by ${author}, ${pages} pages, ${hasRead} read`;
    }
}




console.log(myLibrary);

function displayBook(){
    const container = document.querySelector(".books");

    
    
//how to add index to foreach
    myLibrary.forEach((book, i) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.classList.add("card-" + i);
        container.appendChild(cardDiv);
    
        const card = document.querySelector(".card-"+ i);

        let pTitle = document.createElement("p");

        //Make this a function (?) appendText function
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
    })
}


displayBook();