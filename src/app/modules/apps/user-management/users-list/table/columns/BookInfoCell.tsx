/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../../_metronic/helpers'
import {Book} from '../../core/_models'

type Props = {
    book: Book
}

const BookInfoCell: FC<Props> = ({book}) => (
    <div className='d-flex align-items-center'>
        {/* begin:: Avatar */}
        <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
            <a href='#'>
                {book.avatar ? (
                    <div className='symbol-label'>
                        <img src={toAbsoluteUrl(`/media/${book.avatar}`)} alt={book.name} className='w-100'/>
                    </div>
                ) : (
                    <div
                        className={clsx(
                            'symbol-label fs-3',
                            `bg-light-${book.author}`,
                            `text-${book.author}`
                        )}
                    >
                        {book.author}
                    </div>
                )}
            </a>
        </div>
        <div className='d-flex flex-column'>
            <a href='#' className='text-gray-800 text-hover-primary mb-1'>
                {book.name}
            </a>
            <span>{book.category}</span>
        </div>
    </div>
)

export {BookInfoCell}
