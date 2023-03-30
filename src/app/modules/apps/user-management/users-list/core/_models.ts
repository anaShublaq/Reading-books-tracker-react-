import {ID, Response} from '../../../../../../_metronic/helpers'

export type Book = {
    id?: ID
    name?: string
    avatar?: string
    author?: string
    version_number?: number
    category?: string
    number_of_pages?: number
}

export type BooksQueryResponse = Response<Array<Book>>

export const initialBook: Book = {
    name: '',
    avatar: 'avatars/300-6.jpg',
    author: 'Art Director',
    version_number: 0,
    category: '',
    number_of_pages: 0,
}
