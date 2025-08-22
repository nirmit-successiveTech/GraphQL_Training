
import { Books } from "./dataSource.js"
export const bookMutationResolver={
    postBook:(_,{title,genre})=>{
        const newBook={
            id:String(Books.length+1),
            title,
            year:212,
            genre,
        }
        Books.push(newBook);
        return newBook
    }
}