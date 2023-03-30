/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {toAbsoluteUrl, KTSVG} from '../../../helpers'
import {Dropdown1} from '../dropdown/Dropdown1'

type Props = {
    icon: string
    title: string
    description: string
}

const Card4: FC<Props> = ({icon, title, description}) => {
    return (
        <div className='card h-100'>
            <div className='card-header flex-nowrap border-0 pt-9'>
                <div className='card-title m-0'>
                    <a href='#' className='fs-4 fw-bold text-hover-primary text-gray-600 m-0'>
                        <div className='fs-7 fw-bold text-gray-400 mt-auto'>{description}</div>
                    </a>
                </div>

                <div className='card-toolbar m-0'>
                    <button
                        type='button'
                        className='btn btn-clean btn-sm btn-icon btn-icon-primary btn-active-light-primary me-n3'
                        data-kt-menu-trigger='click'
                        data-kt-menu-placement='bottom-end'
                        data-kt-menu-flip='top-end'
                    >
                        <KTSVG
                            path='/media/icons/duotune/general/gen024.svg'
                            className='svg-icon-3 svg-icon-primary'
                        />
                    </button>

                    <Dropdown1/>
                </div>
            </div>
            <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
                <a href='#' className='text-gray-800 text-hover-primary d-flex flex-column'>
                    <div className='symbol symbol-75px mb-6'>
                        <img src={toAbsoluteUrl(icon)} alt=''/>
                    </div>
                    <div className='fs-5 fw-bolder mb-2'>{title}</div>
                    <div className='d-flex align-items-center flex-column mt-10'>
                        <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                            <span className='fw-bold fs-6 text-gray-400'>Compleation</span>
                            <span className='fw-bolder fs-6'>60%</span>
                        </div>
                        <div className='h-5px mx-3 w-100 bg-light mb-3'>
                            <div
                                className='bg-success rounded h-5px'
                                role='progressbar'
                                style={{width: '60%'}}
                            ></div>
                        </div>
                    </div>
                </a>
            </div>
        </div>

    )
}

export {Card4}
