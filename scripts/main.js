class Categoria {
    constructor (template){
        if(template == null){
            this.name = ""
            this.icon = ""
            this.description = "";
            this.livros = [];
            return;
        }
        this.name = template.children[0].innerHTML;
        this.icon = template.children[1].innerHTML;
        this.description = template.children[2].innerHTML;
        this.livros = [];
    }
}

class Livro {
    constructor (template){
        this.name = template.children[0].innerHTML;
        this.category = template.children[1].innerHTML;
        this.photo = template.children[2].innerHTML;
        this.description = template.children[3].innerHTML;
        this.link = template.children[4].innerHTML;
    }
}

var categories = [];
var books = [];
const categoriakey = "SoftSkills";

function OnLoadCategories(data)
{
    let categoriesElement = data.firstChild;
    for(i = 0; i < categoriesElement.childElementCount; i++)
    {
        let categorie = new Categoria (categoriesElement.children[i]);
        categories[categorie.name] = (categorie);
    }
      
    console.log(categories);
    LoadXML("datas/books.xml", OnLoadBooks);
}

function OnLoadBooks(data)
{
    let booksElement = data.firstChild;
    for(i = 0; i < booksElement.childElementCount; i++)
    {
        let book = new Livro (booksElement.children[i]);
        books.push(book);
        categories[book.category].livros.push(book);
    }
    console.log(books);
}

LoadXML("datas/categories.xml", OnLoadCategories);

