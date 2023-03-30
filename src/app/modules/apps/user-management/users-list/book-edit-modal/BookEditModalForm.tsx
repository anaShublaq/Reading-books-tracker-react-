import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {initialBook, Book} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {BooksListLoading} from '../components/loading/BooksListLoading'
import {createBook, updateBook} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'

type Props = {
    isBookLoading: boolean
    Book: Book
}

const editBookSchema = Yup.object().shape({
    author: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Author is required'),
    name: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Name is required'),
    number_of_pages: Yup.string()
        .min(1, 'Invalid number')
        .required('number of pages is required'),
    version_number: Yup.string()
        .min(0, 'Invalid number')
        .required('version number is required'),
    category: Yup.string()
        .oneOf(['political', 'novels', 'social'], 'Invalid category')
        // .required('Category is required'),
})

const BookEditModalForm: FC<Props> = ({Book, isBookLoading}) => {
    const {setItemIdForUpdate} = useListView()
    const {refetch} = useQueryResponse()

    const [BookForEdit] = useState<Book>({
        ...Book,
        name: Book.name || initialBook.name,
        avatar: Book.avatar || initialBook.avatar,
        author: Book.author || initialBook.author,
        version_number: Book.version_number || initialBook.version_number,
        category: Book.category || initialBook.category,
        number_of_pages: Book.number_of_pages || initialBook.number_of_pages,
    })

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setItemIdForUpdate(undefined)
    }

    const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
    const BookAvatarImg = toAbsoluteUrl(`/media/${BookForEdit.avatar}`)

    const formik = useFormik({
        initialValues: BookForEdit,
        validationSchema: editBookSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    await updateBook(values)
                } else {
                    await createBook(values)
                }
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(true)
                cancel(true)
            }
        },
    })

    return (
        <>
            <form id='kt_modal_add_Book_form' className='form' onSubmit={formik.handleSubmit} noValidate>
                {/* begin::Scroll */}
                <div
                    className='d-flex flex-column scroll-y me-n7 pe-7'
                    id='kt_modal_add_Book_scroll'
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: false, lg: true}'
                    data-kt-scroll-max-height='auto'
                    data-kt-scroll-dependencies='#kt_modal_add_Book_header'
                    data-kt-scroll-wrappers='#kt_modal_add_Book_scroll'
                    data-kt-scroll-offset='300px'
                >
                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                        {/* begin::Label */}
                        {/*<label className='d-block fw-bold fs-6 mb-5'>Avatar</label>*/}
                        {/* end::Label */}

                        {/* begin::Image input */}
                        {/*<div*/}
                        {/*    className='image-input image-input-outline'*/}
                        {/*    data-kt-image-input='true'*/}
                        {/*    style={{backgroundImage: `url('${blankImg}')`}}*/}
                        {/*>*/}
                        {/* begin::Preview existing avatar */}
                        {/*<div*/}
                        {/*    className='image-input-wrapper w-125px h-125px'*/}
                        {/*    style={{backgroundImage: `url('${BookAvatarImg}')`}}*/}
                        {/*></div>*/}
                        {/* end::Preview existing avatar */}

                        {/* begin::Label */}
                        {/* <label
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='change'
              data-bs-toggle='tooltip'
              title='Change avatar'
            >
              <i className='bi bi-pencil-fill fs-7'></i>

              <input type='file' name='avatar' accept='.png, .jpg, .jpeg' />
              <input type='hidden' name='avatar_remove' />
            </label> */}
                        {/* end::Label */}

                        {/* begin::Cancel */}
                        {/* <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='cancel'
              data-bs-toggle='tooltip'
              title='Cancel avatar'
            >
              <i className='bi bi-x fs-2'></i>
            </span> */}
                        {/* end::Cancel */}

                        {/* begin::Remove */}
                        {/* <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='remove'
              data-bs-toggle='tooltip'
              title='Remove avatar'
            >
              <i className='bi bi-x fs-2'></i>
            </span> */}
                        {/* end::Remove */}
                        {/*</div>*/}
                        {/* end::Image input */}

                        {/* begin::Hint */}
                        {/* <div className='form-text'>Allowed file types: png, jpg, jpeg.</div> */}
                        {/* end::Hint */}
                        {/*</div>*/}
                        {/* end::Input group */}

                        {/* begin::Input group */}
                        <div className='fv-row mb-7 mt-4'>
                            {/* begin::Label */}
                            <label className='required fw-bold fs-6 mb-2'>Book Name</label>
                            {/* end::Label */}

                            {/* begin::Input */}
                            <input
                                placeholder='Enter Book name'
                                {...formik.getFieldProps('name')}
                                type='text'
                                name='name'
                                className={clsx(
                                    'form-control form-control-solid mb-3 mb-lg-0',
                                    {'is-invalid': formik.touched.name && formik.errors.name},
                                    {
                                        'is-valid': formik.touched.name && !formik.errors.name,
                                    }
                                )}
                                autoComplete='off'
                                disabled={formik.isSubmitting || isBookLoading}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.name}</span>
                                    </div>
                                </div>
                            )}
                            {/* end::Input */}
                        </div>
                        {/* end::Input group */}

                        {/* begin::Input group */}
                        <div className='fv-row mb-7'>
                            {/* begin::Label */}
                            <label className='required fw-bold fs-6 mb-2'>Auther</label>
                            {/* end::Label */}

                            {/* begin::Input */}
                            <input
                                placeholder='Enter Auther'
                                {...formik.getFieldProps('auther')}
                                className={clsx(
                                    'form-control form-control-solid mb-3 mb-lg-0',
                                    {'is-invalid': formik.touched.author && formik.errors.author},
                                    {
                                        'is-valid': formik.touched.author && !formik.errors.author,
                                    }
                                )}
                                type='text'
                                name='author'
                                autoComplete='off'
                                disabled={formik.isSubmitting || isBookLoading}
                            />
                            {/* end::Input */}
                            {formik.touched.author && formik.errors.author && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.author}</span>
                                </div>
                            )}
                        </div>
                        {/* end::Input group */}

                        {/* begin::Input group */}
                        <div className='fv-row mb-7'>
                            {/* begin::Label */}
                            <label className='required fw-bold fs-6 mb-2'>Version Number</label>
                            {/* end::Label */}

                            {/* begin::Input */}
                            <input
                                placeholder='Enter Version Number'
                                {...formik.getFieldProps('version_number')}
                                className={clsx(
                                    'form-control form-control-solid mb-3 mb-lg-0',
                                    {'is-invalid': formik.touched.version_number && formik.errors.version_number},
                                    {
                                        'is-valid': formik.touched.version_number && !formik.errors.version_number,
                                    }
                                )}
                                type='number'
                                name='version_number'
                                autoComplete='off'
                                disabled={formik.isSubmitting || isBookLoading}
                            />
                            {/* end::Input */}
                            {formik.touched.version_number && formik.errors.version_number && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.version_number}</span>
                                </div>
                            )}
                        </div>
                        {/* end::Input group */}
                        <div className='fv-row mb-7'>
                            {/* begin::Label */}
                            <label className='required fw-bold fs-6 mb-2'>Number Of Pages</label>
                            {/* end::Label */}
                            {/* begin::Input */}
                            <input
                                placeholder='Enter Number Of Pages'
                                {...formik.getFieldProps('number_of_pages')}
                                className={clsx(
                                    'form-control form-control-solid mb-3 mb-lg-0',
                                    {'is-invalid': formik.touched.number_of_pages && formik.errors.number_of_pages},
                                    {
                                        'is-valid': formik.touched.number_of_pages && !formik.errors.number_of_pages,
                                    }
                                )}
                                type='number'
                                name='number_of_pages'
                                autoComplete='off'
                                disabled={formik.isSubmitting || isBookLoading}
                            />
                            {/* end::Input */}
                            {formik.touched.number_of_pages && formik.errors.number_of_pages && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.number_of_pages}</span>
                                </div>
                            )}
                        </div>
                        {/* end::Input group */}


                        {/* begin::Input group */}
                        <div className='fv-row mb-7'>
                            {/* begin::Label */}
                            <label className='required fw-bold fs-6 mb-2'>category</label>
                            {/* end::Label */}

                            {/* begin::Input */}
                            <select className={clsx(
                                'form-select form-select-solid form-select-lg fw-bold',
                                {'is-invalid': formik.touched.category && formik.errors.category},
                                {
                                    'is-valid': formik.touched.category && !formik.errors.category,
                                }
                            )}
                                    name='category'
                                    autoComplete='off'
                                    disabled={formik.isSubmitting || isBookLoading}>
                                <option value="">Select Category...</option>
                                <option value="Political">Political</option>
                                <option value="novels">Novels</option>
                                <option value="social">Social</option>
                            </select>
                            {/* end::Input */}
                            {formik.touched.category && formik.errors.category && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.category}</span>
                                </div>
                            )}
                        </div>
                        {/* end::Input group */}

                        {/* begin::Input group */}
                        {/*<div className='mb-7'>*/}
                        {/*    /!* begin::Label *!/*/}
                        {/*    /!*<label className='required fw-bold fs-6 mb-5'>Role</label>*!/*/}
                        {/*    /!* end::Label *!/*/}
                        {/*    /!* begin::Roles *!/*/}
                        {/*    /!* begin::Input row *!/*/}
                        {/*    /!*<div className='d-flex fv-row'>*!/*/}
                        {/*    /!*    /!* begin::Radio *!/*!/*/}
                        {/*    /!*    /!*<div className='form-check form-check-custom form-check-solid'>*!/*!/*/}
                        {/*    /!*    /!*    /!* begin::Input *!/*!/*!/*/}
                        {/*    /!*    /!*    <input*!/*!/*/}
                        {/*    /!*    /!*        className='form-check-input me-3'*!/*!/*/}
                        {/*    /!*    /!*        {...formik.getFieldProps('role')}*!/*!/*/}
                        {/*    /!*    /!*        name='role'*!/*!/*/}
                        {/*    /!*    /!*        type='radio'*!/*!/*/}
                        {/*    /!*    /!*        value='Administrator'*!/*!/*/}
                        {/*    /!*    /!*        id='kt_modal_update_role_option_0'*!/*!/*/}
                        {/*    /!*    /!*        checked={formik.values.role === 'Administrator'}*!/*!/*/}
                        {/*    /!*    /!*        disabled={formik.isSubmitting || isBookLoading}*!/*!/*/}
                        {/*    /!*    /!*    />*!/*!/*/}
                        {/*    /!*    *!/*/}
                        {/*    /!*    /!*    /!* end::Input *!/*!/*!/*/}
                        {/*    /!*    /!*    /!* begin::Label *!/*!/*!/*/}
                        {/*    /!*    /!*    <label className='form-check-label' htmlFor='kt_modal_update_role_option_0'>*!/*!/*/}
                        {/*    /!*    /!*        <div className='fw-bolder text-gray-800'>Administrator</div>*!/*!/*/}
                        {/*    /!*    /!*        <div className='text-gray-600'>*!/*!/*/}
                        {/*    /!*    /!*            Best for business owners and company administrators*!/*!/*/}
                        {/*    /!*    /!*        </div>*!/*!/*/}
                        {/*    /!*    /!*    </label>*!/*!/*/}
                        {/*    /!*    /!*    /!* end::Label *!/*!/*!/*/}
                        {/*    /!*    /!*</div>*!/*!/*/}
                        {/*    /!*    /!* end::Radio *!/*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*    /!* end::Input row *!/*/}
                        {/*    /!*<div className='separator separator-dashed my-5'></div>*!/*/}
                        {/*    /!* begin::Input row *!/*/}
                        {/*    /!*<div className='d-flex fv-row'>*!/*/}
                        {/*    /!*    /!* begin::Radio *!/*!/*/}
                        {/*    /!*    /!*<div className='form-check form-check-custom form-check-solid'>*!/*!/*/}
                        {/*    /!*    /!*    /!* begin::Input *!/*!/*!/*/}
                        {/*    /!*    /!*    <input*!/*!/*/}
                        {/*    /!*    /!*        className='form-check-input me-3'*!/*!/*/}
                        {/*    /!*    /!*        {...formik.getFieldProps('role')}*!/*!/*/}
                        {/*    /!*    /!*        name='role'*!/*!/*/}
                        {/*    /!*    /!*        type='radio'*!/*!/*/}
                        {/*    /!*    /!*        value='Developer'*!/*!/*/}
                        {/*    /!*    /!*        id='kt_modal_update_role_option_1'*!/*!/*/}
                        {/*    /!*    /!*        checked={formik.values.role === 'Developer'}*!/*!/*/}
                        {/*    /!*    /!*        disabled={formik.isSubmitting || isBookLoading}*!/*!/*/}
                        {/*    /!*    /!*    />*!/*!/*/}
                        {/*    /!*    /!*    /!* end::Input *!/*!/*!/*/}
                        {/*    /!*    /!*    /!* begin::Label *!/*!/*!/*/}
                        {/*    /!*    /!*    <label className='form-check-label' htmlFor='kt_modal_update_role_option_1'>*!/*!/*/}
                        {/*    /!*    /!*        <div className='fw-bolder text-gray-800'>Developer</div>*!/*!/*/}
                        {/*    /!*    /!*        <div className='text-gray-600'>*!/*!/*/}
                        {/*    /!*    /!*            Best for developers or people primarily using the API*!/*!/*/}
                        {/*    /!*    /!*        </div>*!/*!/*/}
                        {/*    /!*    /!*    </label>*!/*!/*/}
                        {/*    /!*    /!*    /!* end::Label *!/*!/*!/*/}
                        {/*    /!*    /!*</div>*!/*!/*/}
                        {/*    /!*    /!* end::Radio *!/*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*    /!* end::Input row *!/*/}
                        {/*    /!*<div className='separator separator-dashed my-5'></div>*!/*/}
                        {/*    /!* begin::Input row *!/*/}
                        {/*    /!*<div className='d-flex fv-row'>*!/*/}
                        {/*    /!*    /!* begin::Radio *!/*!/*/}
                        {/*    /!*    /!*<div className='form-check form-check-custom form-check-solid'>*!/*!/*/}
                        {/*    /!*    /!*    /!* begin::Input *!/*!/*!/*/}
                        {/*    /!*    /!*    <input*!/*!/*/}
                        {/*    /!*    /!*        className='form-check-input me-3'*!/*!/*/}
                        {/*    /!*    /!*        {...formik.getFieldProps('role')}*!/*!/*/}
                        {/*    /!*    /!*        name='role'*!/*!/*/}
                        {/*    /!*    /!*        type='radio'*!/*!/*/}
                        {/*    /!*    /!*        value='Analyst'*!/*!/*/}
                        {/*    /!*    /!*        id='kt_modal_update_role_option_2'*!/*!/*/}
                        {/*    /!*    /!*        checked={formik.values.role === 'Analyst'}*!/*!/*/}
                        {/*    /!*    /!*        disabled={formik.isSubmitting || isBookLoading}*!/*!/*/}
                        {/*    /!*    /!*    />*!/*!/*/}
                        {/*    /!*    *!/*/}
                        {/*    /!*    /!*    /!* end::Input *!/*!/*!/*/}
                        {/*    /!*    /!*    /!* begin::Label *!/*!/*!/*/}
                        {/*    /!*    /!*    <label className='form-check-label' htmlFor='kt_modal_update_role_option_2'>*!/*!/*/}
                        {/*    /!*    /!*        <div className='fw-bolder text-gray-800'>Analyst</div>*!/*!/*/}
                        {/*    /!*    /!*        <div className='text-gray-600'>*!/*!/*/}
                        {/*    /!*    /!*            Best for people who need full access to analytics data, but don't need to update*!/*!/*/}
                        {/*    /!*    /!*            business settings*!/*!/*/}
                        {/*    /!*    /!*        </div>*!/*!/*/}
                        {/*    /!*    /!*    </label>*!/*!/*/}
                        {/*    /!*    /!*    /!* end::Label *!/*!/*!/*/}
                        {/*    /!*    /!*</div>*!/*!/*/}
                        {/*    /!*    /!* end::Radio *!/*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*    /!* end::Input row *!/*/}
                        {/*    /!*<div className='separator separator-dashed my-5'></div>*!/*/}
                        {/*    /!* begin::Input row *!/*/}
                        {/*    /!*<div className='d-flex fv-row'>*!/*/}
                        {/*    /!* begin::Radio *!/*/}
                        {/*    /!*<div className='form-check form-check-custom form-check-solid'>*!/*/}
                        {/*    /!*    /!* begin::Input *!/*!/*/}
                        {/*    /!*    <input*!/*/}
                        {/*    /!*        className='form-check-input me-3'*!/*/}
                        {/*    /!*        {...formik.getFieldProps('role')}*!/*/}
                        {/*    /!*        name='role'*!/*/}
                        {/*    /!*        type='radio'*!/*/}
                        {/*    /!*        value='Support'*!/*/}
                        {/*    /!*        id='kt_modal_update_role_option_3'*!/*/}
                        {/*    /!*        checked={formik.values.role === 'Support'}*!/*/}
                        {/*    /!*        disabled={formik.isSubmitting || isBookLoading}*!/*/}
                        {/*    /!*    />*!/*/}
                        {/*    /!*    /!* end::Input *!/*!/*/}
                        {/*    /!*    /!* begin::Label *!/*!/*/}
                        {/*    /!*    <label className='form-check-label' htmlFor='kt_modal_update_role_option_3'>*!/*/}
                        {/*    /!*        <div className='fw-bolder text-gray-800'>Support</div>*!/*/}
                        {/*    /!*        <div className='text-gray-600'>*!/*/}
                        {/*    /!*            Best for employees who regularly refund payments and respond to disputes*!/*/}
                        {/*    /!*        </div>*!/*/}
                        {/*    /!*    </label>*!/*/}
                        {/*    /!*    /!* end::Label *!/*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*    /!* end::Radio *!/*/}
                        {/*</div>*/}
                        {/* end::Input row */}
                        {/*<div className='separator separator-dashed my-5'></div>*/}
                        {/* begin::Input row */}
                        {/*<div className='d-flex fv-row'>*/}
                        {/* begin::Radio */}
                        {/*<div className='form-check form-check-custom form-check-solid'>*/}
                        {/*    /!* begin::Input *!/*/}
                        {/*    <input*/}
                        {/*        className='form-check-input me-3'*/}
                        {/*        {...formik.getFieldProps('role')}*/}
                        {/*        name='role'*/}
                        {/*        type='radio'*/}
                        {/*        id='kt_modal_update_role_option_4'*/}
                        {/*        value='Trial'*/}
                        {/*        checked={formik.values.role === 'Trial'}*/}
                        {/*        disabled={formik.isSubmitting || isBookLoading}*/}
                        {/*    />*/}
                        {/*    /!* end::Input *!/*/}
                        {/*    /!* begin::Label *!/*/}
                        {/*    /!*<label className='form-check-label' htmlFor='kt_modal_update_role_option_4'>*!/*/}
                        {/*    /!*    <div className='fw-bolder text-gray-800'>Trial</div>*!/*/}
                        {/*    /!*    <div className='text-gray-600'>*!/*/}
                        {/*    /!*        Best for people who need to preview content data, but don't need to make any*!/*/}
                        {/*    /!*        updates*!/*/}
                        {/*    /!*    </div>*!/*/}
                        {/*    /!*</label>*!/*/}
                        {/*    /!* end::Label *!/*/}
                        {/*</div>*/}
                        {/* end::Radio */}
                    </div>
                    {/* end::Input row */}
                    {/* end::Roles */}
                </div>
                {/* end::Input group */}
                {/*</div>*/}
                {/* end::Scroll */}

                {/* begin::Actions */}
                <div className='text-center pt-15'>
                    <button
                        type='reset'
                        onClick={() => cancel()}
                        className='btn btn-light me-3'
                        data-kt-Books-modal-action='cancel'
                        disabled={formik.isSubmitting || isBookLoading}
                    >
                        Discard
                    </button>

                    <button
                        type='submit'
                        className='btn btn-primary'
                        data-kt-Books-modal-action='submit'
                        disabled={isBookLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
                    >
                        <span className='indicator-label'>Submit</span>
                        {(formik.isSubmitting || isBookLoading) && (
                            <span className='indicator-progress'>
                Please wait...{' '}
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
                        )}
                    </button>
                </div>
                {/* end::Actions */}
            </form>
            {
                (formik.isSubmitting || isBookLoading) && <BooksListLoading/>
            }
        </>
    )
}

export
{
    BookEditModalForm
}
