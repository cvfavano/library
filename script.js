function Book(title,author,pages,hasRead){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.hasRead = hasRead,
    this.info = function(){
        return `The ${title} by ${author}, ${pages} pages, ${hasRead} read`;
    }
}

const theHobbit = new Book("The Hobbit", "JRR Tolkien", 295, true);
console.log(theHobbit.info);