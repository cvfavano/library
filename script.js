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

    myLibrary.forEach((book) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.classList.add("card-" + book.id);
        container.appendChild(cardDiv);
    
        const card = document.querySelector(".card-"+ book.id);

        let pTitle = document.createElement("p");
        pTitle.classList.add("title");
        
        //Make this a function (?) appendText function
        //create p tags and append
        let pAuthor = document.createElement("p");
        pAuthor.classList.add("author");
        
        let pPages = document.createElement("p");
        pPages.classList.add("page-number");

        let pRead = document.createElement("p");
        pRead.classList.add("read-status")

        const titleText = document.createTextNode(book.title);
        pTitle.appendChild(titleText);
        card.appendChild(pTitle);
        
        const authorText = document.createTextNode(book.author);
        pAuthor.appendChild(authorText);
        card.appendChild(pAuthor);

        const pagesText = document.createTextNode(book.pages);
        pPages.appendChild(pagesText);
        card.appendChild(pPages);

        let hasReadText = document.createElement("button");
        if(book.hasRead ) {
            hasReadText.textContent = "yes";
            hasReadText.className ='btn read';
        }
        else {
             hasReadText.textContent = "no";
             hasReadText.className ='btn not-read';
        }
        card.appendChild(hasReadText);

        //create remove button and append
        let removebutton = document.createElement("button");
        removebutton.dataset.bookId = book.id;
        removebutton.textContent = "Remove";
        card.appendChild(removebutton);
        removebutton.className = 'remove-btn index-' + book.id;

        removebutton.addEventListener('click',  (e) => {
            const matchIndex = myLibrary.findIndex((i) =>{
                return i.id == book.id;
            } )
                  
            //remove from array 
            myLibrary.splice(matchIndex, 1);
        
            //remove from display
            const card = document.querySelector('.card-' + book.id);
            card.remove();

        });

        hasReadText.addEventListener('click', (e) => {
            
            if(book.hasRead){
                book.hasRead = false;
                hasReadText.textContent = 'no';
            }

            else{
                book.hasRead = true;
                hasReadText.textContent = 'yes';
            }
        });
        
    })
}




//function appendText(){}

//function createCard(){}




//use this for adding new book's ID
function getMaxID(arr){
    const idList = arr.map(object => {return object.id});
    const maxID = Math.max(...idList);
    return maxID;
}

bookAdministration();
