/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {Card4} from '../../../_metronic/partials/content/cards/Card4'
import {
  MixedWidget2,
  MixedWidget10,
  MixedWidget11,
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget5,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
} from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}
    <div className='row gy-5 g-xl-8'>
      <div className='col-xxl-4'>
        {/*<MixedWidget2*/}
        {/*  className='card-xl-stretch mb-xl-8'*/}
        {/*  chartColor='danger'*/}
        {/*  chartHeight='200px'*/}
        {/*  strokeColor='#cb1e46'*/}
        {/*/>*/}
        {/*<div className='row g-6 g-xl-9 mb-6 mb-xl-9'>*/}
        {/*  <div className='col-12 col-sm-12 col-xl'>*/}
        {/*    <Card4*/}
        {/*        icon='/media/svg/files/folder-document.svg'*/}
        {/*        title='Finance'*/}
        {/*        description='7 files'*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <div className='col-12 col-sm-12 col-xl'>*/}
        {/*    <Card4*/}
        {/*        icon='/media/svg/files/folder-document.svg'*/}
        {/*        title='Customers'*/}
        {/*        description='3 files'*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <div className='col-12 col-sm-12 col-xl'>*/}
        {/*    <Card4*/}
        {/*        icon='/media/svg/files/folder-document.svg'*/}
        {/*        title='CRM Project'*/}
        {/*        description='25 files'*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
          <div className='col-4'>
            <Card4 icon='/media/svg/files/pdf.svg' title='Project Reqs..' description='3 days ago' />
          </div>
          <div className='col-4'>
            <Card4 icon='/media/svg/files/doc.svg' title='CRM App Docs..' description='3 days ago' />
          </div>
          <div className='col-4'>
            <Card4
                icon='/media/svg/files/css.svg'
                title='User CRUD Styles'
                description='4 days ago'
            />
          </div>
          <div className='col-6'>
            <Card4 icon='/media/svg/files/ai.svg' title='Metronic Logo' description='5 days ago' />
          </div>
          <div className='col-6'>
            <Card4 icon='/media/svg/files/sql.svg' title='Orders backup' description='1 week ago' />
          </div>
        </div>

        <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
          <div className='col-12 col-sm-12 col-xl'>
            <Card4
                icon='/media/svg/files/xml.svg'
                title='UTAIR CRM API Co..'
                description='2 week ago'
            />
          </div>
          <div className='col-12 col-sm-12 col-xl'>
            <Card4
                icon='/media/svg/files/tif.svg'
                title='Tower Hill App..'
                description='3 week ago'
            />
          </div>
        </div>
      </div>
      {/*<div className='col-xxl-4'>*/}
      {/*  <ListsWidget5 className='card-xxl-stretch' />*/}
      {/*</div>*/}
      {/*<div className='col-xxl-4'>*/}
        {/*<MixedWidget10*/}
        {/*  className='card-xxl-stretch-50 mb-5 mb-xl-8'*/}
        {/*  chartColor='primary'*/}
        {/*  chartHeight='150px'*/}
        {/*/>*/}
        {/*<MixedWidget11*/}
        {/*  className='card-xxl-stretch-50 mb-5 mb-xl-8'*/}
        {/*  chartColor='primary'*/}
        {/*  chartHeight='175px'*/}
        {/*/>*/}
      {/*</div>*/}
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    {/*<div className='row gy-5 gx-xl-8'>*/}
    {/*  <div className='col-xxl-4'>*/}
    {/*    <ListsWidget3 className='card-xxl-stretch mb-xl-3' />*/}
    {/*  </div>*/}
    {/*  <div className='col-xl-8'>*/}
    {/*    <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />*/}
    {/*  </div>*/}
    {/*</div>*/}
    {/* end::Row */}

    {/* begin::Row */}
    {/*<div className='row gy-5 g-xl-8'>*/}
    {/*  <div className='col-xl-4'>*/}
    {/*    <ListsWidget2 className='card-xl-stretch mb-xl-8' />*/}
    {/*  </div>*/}
    {/*  <div className='col-xl-4'>*/}
    {/*    <ListsWidget6 className='card-xl-stretch mb-xl-8' />*/}
    {/*  </div>*/}
    {/*  <div className='col-xl-4'>*/}
    {/*    <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />*/}
    {/*    /!* partials/widgets/lists/_widget-4', 'class' => 'card-xl-stretch mb-5 mb-xl-8', 'items' => '5' *!/*/}
    {/*  </div>*/}
    {/*</div>*/}
    {/* end::Row */}

    {/*<div className='row g-5 gx-xxl-8'>*/}
    {/*  <div className='col-xxl-4'>*/}
    {/*    <MixedWidget8*/}
    {/*      className='card-xxl-stretch mb-xl-3'*/}
    {/*      chartColor='success'*/}
    {/*      chartHeight='150px'*/}
    {/*    />*/}
    {/*  </div>*/}
    {/*  <div className='col-xxl-8'>*/}
    {/*    <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />*/}
    {/*  </div>*/}
    {/*</div>*/}

  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'Home'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
