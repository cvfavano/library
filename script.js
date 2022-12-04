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

        const pagesText = document.createTextNode(`${book.pages} pages`);
        pPages.appendChild(pagesText);
        card.appendChild(pPages);

        let hasReadDiv = document.createElement("div");
        let pTitleRead = document.createElement("p");
        let readHeader = document.createTextNode('Read')
        pTitleRead.appendChild(readHeader);
        hasReadDiv.appendChild(pTitleRead);

        let pReadText = document.createElement("p");
        let icon = document.createElement("i");


        if(book.hasRead ) {
            pReadText.appendChild(icon).className ="fa-solid fa-check";            

            hasReadDiv.className ='flag btn read';
        }
        else {
            hasReadDiv.className ='flag btn not-read';
            pReadText.appendChild(icon).className ="fa-solid fa-question";            

        }
        hasReadDiv.appendChild(pReadText);
        
        
        
        card.appendChild(hasReadDiv);



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

        hasReadDiv.addEventListener('click', (e) => {
            
            if(book.hasRead){
                book.hasRead = false;
                icon.className = 'fa-solid fa-question';
                hasReadDiv.className = 'flag btn not-read';
            }

            else{
                book.hasRead = true;
                icon.className = 'fa-solid fa-check';
                hasReadDiv.className = 'flag btn read';
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
