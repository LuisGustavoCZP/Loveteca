class Categoria {
    constructor (template){
        if(template == null){
            this.name = ""
            this.icon = ""
            this.description = "";
            this.livros = [];
            return;
        }

        this.name = template.name;
        this.icon = template.icon;
        this.description = template.description;
        this.livros = [];
    }

    createBooks (){
        booksTag.firstChild.remove();
        let ulTag = document.createElement("ul");
        for(i in this.livros){
            this.livros[i].createElement(ulTag);
        }
        booksTag.append(ulTag);
    }

    createElement (parent) 
    {
        let li = document.createElement("li");
        let a = document.createElement("a");
        let content = document.createElement("div");
        let icon = document.createElement("div");

        a.onclick = x => {this.createBooks()};

        icon.classList.add("colored-icon");
        icon.style.setProperty('--icon-src', "url("+this.icon+")");

        content.append(icon);
        a.append(content);

        let title = document.createElement("h3");
        title.innerText = this.name;
        a.append(title);
        
        li.append(a);
        parent.append(li);
    }
}

class Livro {
    constructor (template){
        this.name = template.name;
        this.category = template.category;
        this.photo = template.photo;
        this.description = template.description;
        this.link = template.link;
    }

    createElement (parent) 
    {
        let li = document.createElement("li");
        let a = document.createElement("a");
        let img = document.createElement("img");

        a.onclick = () => 
        {
            
        };

        img.src = this.photo;

        a.append(img);

        let title = document.createElement("h4");
        title.innerText = this.name;
        a.append(title);
        
        li.append(a);
        parent.append(li);
    }
}

var booksTag = document.getElementById("books");
var categories = [];
var books = [];
var firstCategory = "";

function OnLoadCategories(data)
{
    let categoriesTag = document.getElementById("categories");
    
    for(i = 0; i < data.length; i++)
    {
        let categorie = new Categoria (data[i]);
        if(firstCategory == "") firstCategory = categorie.name;
        categories[categorie.name] = categorie;
        categories.length++;
        categorie.createElement(categoriesTag);
    }
    
    console.log(categories);
    LoadJSON("datas/books.json", OnLoadBooks);
}

function OnLoadBooks(data)
{
    for(i = 0; i < data.length; i++)
    {
        let book = new Livro (data[i]);
        books.push(book);
        categories[book.category].livros.push(book);
    }
    console.log(books);
    
    if(categories.length > 0) {
        categories[firstCategory].createBooks ();
    }
}

LoadJSON("datas/categories.json", OnLoadCategories);

//console.log(JSON.stringify([new Categoria(null)]));