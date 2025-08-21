
import { Authors, Books } from "./dataSource.js";


export const bookQueryResolver={
    books:()=>Books,
    getBook:(_,{id})=>Books.find(book => book.id===parseInt(id)),
    author:(_,{id})=>Authors.find(author =>author.id===parseInt(id)),
    getbookbyauthor:(_,{id})=>Books.filter( book => book.authorId ===parseInt(id))

}