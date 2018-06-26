/**
 * Created by Administrator on 2018/6/25 0025.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'


const Record = ({
  location, dispatch, record, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,
  } = record

  const handleRefresh = (newQuery) => {
    console.log(newQuery)
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
    }),
  }))
  }

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[`record/${modalType}`],
    title: `${modalType === 'create' ? 'Create User' : 'Records'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      console.log(data);
      dispatch({
        type: `record/${modalType}`,
        payload: data,
      })
        .then(() => {
        handleRefresh()
      })
    },
    onCancel () {
      dispatch({
        type: 'record/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['record/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'record/delete',
        payload: id,
      })
        .then(() => {
        handleRefresh({
          page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
    })
    })
    },
    onEditItem (item) {
      dispatch({
        type: 'record/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    // rowSelection: {
    //   selectedRowKeys,
    //   onChange: (keys) => {
    //     dispatch({
    //       type: 'record/updateState',
    //       payload: {
    //         selectedRowKeys: keys,
    //       },
    //     })
    //   },
    // },
  }

  const filterProps = {
      isMotion,
      filter: {
        ...query,
    },
    onFilterChange (value) {
    handleRefresh({
        ...value,
      page: 1,
  })
  },

  switchIsMotion () {
    dispatch({ type: 'record/switchIsMotion' })
  },
}
  const  onAdd=()=>{
    dispatch({
      type: 'record/showModal',
      payload: {
        modalType: 'create',
      },
    })
  }
  const handleDeleteItems = () => {
    dispatch({
      type: 'record/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
      .then(() => {
      handleRefresh({
        page: (list.length === selectedRowKeys.length && pagination.current > 1) ? pagination.current - 1 : pagination.current,
  })
  })
  }


  return (
    <Page inner>
  <Filter {...filterProps} />

  {/*<Row style={{ marginBottom: 10, textAlign: 'right', fontSize: 13 }}>*/}
  {/*<Col>*/}
  {/*{`选择 ${selectedRowKeys.length} 项`}*/}
  {/*<Button type="primary" style={{ marginLeft: 8 }} onClick={onAdd}>新增</Button>*/}
  {/*<Button style={{ marginLeft: 8,border:'1px #ffaf38 solid',color:'#ffaf38',background:'#fff8e3' }}>跟踪</Button>*/}

  {/*/!*<Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>*!/*/}
  {/*/!*<Button type="primary" style={{ marginLeft: 8 }}>删除</Button>*!/*/}
  {/*/!*</Popconfirm>*!/*/}
  {/*</Col>*/}
  {/*</Row>*/}

<List {...listProps} />
  {modalVisible && <Modal {...modalProps} />}
</Page>
)
}

Record.propTypes = {
  record: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ record, loading }) => ({ record, loading }))(Record)
