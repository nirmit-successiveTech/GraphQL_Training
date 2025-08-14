
import { Book } from "./dataSource.js"
export const bookMutationResolver={
    postBook:(_,{title,genre})=>{
        const newBook={
            id:String(Book.length+1),
            title,
            year:212,
            genre,
        }
        Book.push(newBook);
        return newBook
    }
}