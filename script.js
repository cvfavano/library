//store all books here
let myLibrary = [];

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


const theHobbit = new Book("The Hobbit", "JRR Tolkien", 295, true);
const toKill = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);

myLibrary.push(theHobbit);
myLibrary.push(toKill);

console.log(myLibrary);

function displayBook(){
    const container = document.querySelector(".container");

    
    

    myLibrary.forEach((book) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        container.appendChild(cardDiv);
    
        const card = document.querySelector(".card");

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