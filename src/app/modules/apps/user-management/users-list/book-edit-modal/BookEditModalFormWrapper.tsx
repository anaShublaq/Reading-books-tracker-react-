import {useQuery} from 'react-query'
import {BookEditModalForm} from './BookEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getBookById} from '../core/_requests'

const BookEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getBookById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate) {
    return <BookEditModalForm isBookLoading={isLoading} Book={{id: undefined}} />
  }

  if (!isLoading && !error && user) {
    return <BookEditModalForm isBookLoading={isLoading} Book={user} />
  }

  return null
}

export {BookEditModalFormWrapper}
