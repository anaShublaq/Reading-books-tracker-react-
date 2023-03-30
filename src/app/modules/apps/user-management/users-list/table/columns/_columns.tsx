// @ts-nocheck
import {Column} from 'react-table'
import {BookInfoCell} from './BookInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {BookTwoStepsCell} from './BookTwoStepsCell'
import {BookActionsCell} from './BookActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {BookCustomHeader} from './BookCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {Book} from '../../core/_models'

const BooksColumns: ReadonlyArray<Column<Book>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <BookCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <BookInfoCell Book={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <BookCustomHeader tableProps={props} title='Author' className='min-w-125px' />,
    accessor: 'author',
  },
  {
    Header: (props) => (
      <BookCustomHeader tableProps={props} title='version number' className='min-w-125px' />
    ),
    id: 'version_number',
    Cell: ({...props}) => <UserLastLoginCell last_login={props.data[props.row.index].last_login} />,
  },
  {
    Header: (props) => (
      <BookCustomHeader tableProps={props} title='category' className='min-w-125px' />
    ),
    id: 'category',
    Cell: ({...props}) => <BookTwoStepsCell two_steps={props.data[props.row.index].two_steps} />,
  },
  {
    Header: (props) => (
      <BookCustomHeader tableProps={props} title='number of pages' className='min-w-125px' />
    ),
    accessor: 'number_of_pages',
  },
  {
    Header: (props) => (
      <BookCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <BookActionsCell id={props.data[props.row.index].id} />,
  },
]

export {BooksColumns}
