//store all books here
let myLibrary = [];

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
function addBookToLibrary(){
    
}


const theHobbit = new Book("The Hobbit", "JRR Tolkien", 295, true);
console.log(theHobbit.info);