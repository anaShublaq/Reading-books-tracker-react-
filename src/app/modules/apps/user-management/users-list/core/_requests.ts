import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {Book, BooksQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const Book_URL = `${API_URL}/Book`
const GET_BookS_URL = `${API_URL}/Books/query`

const getBooks = (query: string): Promise<BooksQueryResponse> => {
  return axios
    .get(`${GET_BookS_URL}?${query}`)
    .then((d: AxiosResponse<BooksQueryResponse>) => d.data)
}

const getBookById = (id: ID): Promise<Book | undefined> => {
  return axios
    .get(`${Book_URL}/${id}`)
    .then((response: AxiosResponse<Response<Book>>) => response.data)
    .then((response: Response<Book>) => response.data)
}

const createBook = (Book: Book): Promise<Book | undefined> => {
  return axios
    .put(Book_URL, Book)
    .then((response: AxiosResponse<Response<Book>>) => response.data)
    .then((response: Response<Book>) => response.data)
}

const updateBook = (Book: Book): Promise<Book | undefined> => {
  return axios
    .post(`${Book_URL}/${Book.id}`, Book)
    .then((response: AxiosResponse<Response<Book>>) => response.data)
    .then((response: Response<Book>) => response.data)
}

const deleteBook = (BookId: ID): Promise<void> => {
  return axios.delete(`${Book_URL}/${BookId}`).then(() => {})
}

const deleteSelectedBooks = (BookIds: Array<ID>): Promise<void> => {
  const requests = BookIds.map((id) => axios.delete(`${Book_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getBooks, deleteBook, deleteSelectedBooks, getBookById, createBook, updateBook}
