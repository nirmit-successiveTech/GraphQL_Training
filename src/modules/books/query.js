
import { Book } from "./dataSource.js";
import { Author } from "./dataSource.js";

export const bookQueryResolver={
    books:()=>Book,
    getBook:(_,{id})=>Book.find(book => book.id===parseInt(id)),
    author:(_,{id})=>Author.find(author =>author.id===parseInt(id))

}