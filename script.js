let aside = document.querySelector('aside');
// let mainContent = document.querySelector("main")
let bookContainer = document.querySelector('.bookCotainer');
let sampleContainer = document.querySelector('.sample-container');
let catagoryName = document.getElementById('catagory-name');
let mydialog = document.querySelector('.mydialog');
let modal = document.querySelector('.modal');
let toggle = document.querySelector(".round");
//todo --------- Fetching API ---------
async function fetchingAPI(){
    let data = await fetch('https://books-backend.p.goit.global/books/top-books');
    let res = await data.json();
    append(res);
    appendAll(res)
}
//TODO---------append all catagories---------------
function appendAll(data){
    catagoryName.setAttribute("data-text", `Books`);
    sampleContainer.innerHTML = ""
    bookContainer.innerHTML = ""
    catagoryName.innerHTML = `Best Sellers Books`
    data.forEach(ele => {
        let sample = document.createElement("div")
        sample.classList.add("sample");
        let sampleTitle = document.createElement("h3")
        sampleTitle.classList.add("sampleTitle")
        sampleTitle.innerText = `${ele.list_name}`
        sample.append(sampleTitle);
        let bookData = ele.books
        for(let i = 1; i<=4; i++){
            if(i==2){
                continue;
            }
            let sampleBooks = document.createElement('div');
            var stringifiedObj = JSON.stringify(bookData[i])
            sampleBooks.classList.add('book');
            sampleBooks.innerHTML = `
                <img src="${bookData[i].book_image}" alt="error" class="bookImage">
                <p class="bookTitle">${bookData[i].title}</p>
                <p class="bookAuthor">${bookData[i].author}</p>
                <p class="view" onclick= 'openDetailsAll(${stringifiedObj})'>Quick View</p>
            `
            sample.appendChild(sampleBooks);
        }
        sampleContainer.appendChild(sample);
    });
}

fetchingAPI();
//todo --------- Append Catagories ---------
function append(arr){
    for(let i=0; i<arr.length; i++){
        let item = document.createElement('p');
        item.classList.add("categories");
        item.innerHTML = `
             ${arr[i].list_name}
        `
        aside.appendChild(item);
    }
    let links = aside.getElementsByClassName("categories"); 
    activateLinks(links);
}
function activateLinks(links){
   for(let i = 0; i < links.length; i++){
    links[i].addEventListener("click", showBooks);
   }
}
//todo --------- Show Books ---------
function showBooks(e){
    // aside.style.color = "rgba(0, 0, 0, 0.562)"
    // e.target.style.color = "rgb(79, 46, 232)"
    if(e.target.innerText == "All Categories"){
        // console.log("hiii");
        fetch('https://books-backend.p.goit.global/books/top-books')
        .then((response) => response.json())
        .then((data)=>{
            appendAll(data)
        })
    }
    else{
        fetchBooks(e.target.innerText);
    }
}
//todo --------- Fetching Books' API ---------
async function fetchBooks(text){
    let data = await fetch(`https://books-backend.p.goit.global/books/category?category=${text}`);
    let res = await data.json();
    createObject(res);
}
//todo --------- Create new object---------
function createObject(res){
    let bookArray = res.map((item) =>{
        return {
            image : item.book_image,
            bookName : item.title,
            author : item.author,
            description : item.description,
            links : [item.buy_links[0].url , item.buy_links[1].url, item.buy_links[2].url],
            listName : item.list_name,
        }
    });
    appendBooks(bookArray);
}
//todo --------- Append all books---------
function appendBooks(bookArray){
    let arr = bookArray[0].listName.split(" ");
    catagoryName.setAttribute("data-text", `${arr[arr.length-1]}`);
    sampleContainer.innerHTML = ""
    bookContainer.innerHTML = ""
    catagoryName.innerHTML = `${bookArray[0].listName}`

    for(let i = 0; i < bookArray.length; i++){
        let books = document.createElement('div');
        var stringifiedObj = JSON.stringify(bookArray[i])
        books.classList.add('book');
        books.innerHTML = `
            <img src="${bookArray[i].image}" alt="error"  class="bookImage">
            <p class="bookTitle">${bookArray[i].bookName}</p>
            <p class="bookAuthor">${bookArray[i].author}</p>
            <p class="view" onclick= 'openDetails(${stringifiedObj})'>Quick View</p>
        `
        bookContainer.appendChild(books);
    }
}
//todo --------- Show dialog box---------
function openDetails(obj){
    if(obj.description == ""){
        obj.description = "there is no description of this book";
    }
    mydialog.show();
    modal.innerHTML = `
    <div class="modalContent">
        <div class="img">
            <img src="${obj.image}" alt="">
        </div>
        <div class="content">
            <div class="bookIntro">
            <h1>${obj.bookName}</h1>
            <p class="contentAuthor">${obj.author}</p>
            </div>
            <div class="bookdescription">
                <p class="contentDescription">${obj.description}</p>
            <div class="links">
                <a href="${obj.links[0]}" target="_blank"><i class="fa-brands fa-amazon"></i></a>
                <a href="${obj.links[1]}" target="_blank"><i class="fa-solid fa-book-open"></i></a>
                <a href="${obj.links[2]}" target="_blank"><i class="fa-solid fa-book"></i></a>
            </div>
            </div>
        </div>
    </div>
    <button> ADD TO SHOPPING LIST</button>
    <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="close" onclick="closeDetails()">
    <path fill="#8b5cf6" fill-rule="evenodd" d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06L8 9.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L9.06 8l3.72-3.72a.75.75 0 0 0-1.06-1.06L8 6.94L4.28 3.22Z" clip-rule="evenodd"/>
</svg>
    `
}

function openDetailsAll(obj){
    console.log(obj);
    if(obj.description == ""){
        obj.description = "there is no description of this book";
    }
    mydialog.show();
    modal.innerHTML = `
    <div class="modalContent">
        <div class="img">
            <img src="${obj.book_image}" alt="">
        </div>
        <div class="content">
            <div class="bookIntro">
            <h1>${obj.title}</h1>
            <p class="contentAuthor">${obj.author}</p>
            </div>
            <div class="bookdescription">
                <p class="contentDescription">${obj.description}</p>
            <div class="links">
                <a href="${obj.buy_links[0].url}" target="_blank"><i class="fa-brands fa-amazon"></i></a>
                <a href="${obj.buy_links[1].url}" target="_blank"><i class="fa-solid fa-book-open"></i></a>
                <a href="${obj.buy_links[2].url}" target="_blank"><i class="fa-solid fa-book"></i></a>
            </div>
            </div>
        </div>
    </div>
    <button> ADD TO SHOPPING LIST</button>
    <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="close" onclick="closeDetails()">
    <path fill="#8b5cf6" fill-rule="evenodd" d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06L8 9.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L9.06 8l3.72-3.72a.75.75 0 0 0-1.06-1.06L8 6.94L4.28 3.22Z" clip-rule="evenodd"/>
</svg>
    `
}
//todo --------- Close dialog box---------
function closeDetails() {
    mydialog.close();
}

//TODO DarkTheme
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});