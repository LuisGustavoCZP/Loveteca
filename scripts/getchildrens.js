function getAnyClass(obj) {
    if (typeof obj === "undefined") return "undefined";
    if (obj === null) return "null";
    return obj.constructor.name;
}

function getChildrens (parent, childrens)
{
    for(i in parent.children)
    {
        let el = parent.children[i];
        if(getAnyClass(el).includes("Element"))
        {
            getChildrens(el, childrens);
            if(el.hasAttribute("id")) childrens.push(el);
        }
    }
    return childrens;
}

let childrens = [];

getChildrens(document.body, childrens);

console.log(childrens);