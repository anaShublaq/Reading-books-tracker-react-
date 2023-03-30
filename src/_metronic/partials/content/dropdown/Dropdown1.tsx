/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import clsx from "clsx";

export function Dropdown1() {
  return (
    <div className='menu menu-sub menu-sub-dropdown w-250px w-md-300px' data-kt-menu='true'>
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>Book Options</div>
      </div>

      <div className='separator border-gray-200'></div>

      <div className='px-7 py-5'>
        <div className='mb-10'>
          <label className='form-label fw-bold'>Details:</label>

          <div>
            <textarea
                className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                placeholder='Enter details'></textarea>
          </div>
        </div>

        <div className='mb-10'>
          <label className='form-label fw-bold'>Current Page Number:</label>

          <div className='d-flex'>
            <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
              <input
                  placeholder='Current Page Number'
                  className={clsx(
                      'form-control form-control-solid mb-3 mb-lg-0',
                  )}
                  type='number'
                  name='version_number'
                  autoComplete='off'
              />
            </label>
          </div>
        </div>

        {/*<div className='mb-10'>*/}
        {/*  <label className='form-label fw-bold'>Notifications:</label>*/}

        {/*  <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>*/}
            {/*<input*/}
            {/*  className='form-check-input'*/}
            {/*  type='checkbox'*/}
            {/*  value=''*/}
            {/*  name='notifications'*/}
            {/*  defaultChecked={true}*/}
            {/*/>*/}
        {/*    <label className='form-check-label'>Enabled</label>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className='d-flex justify-content-end'>
          <button
            type='reset'
            className='btn btn-sm btn-light btn-active-light-primary me-2'
            data-kt-menu-dismiss='true'
          >
            Cancel
          </button>

          <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
