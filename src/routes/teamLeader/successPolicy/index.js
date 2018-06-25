import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm ,Modal} from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Offermodal from './Modal'
import styles from './List.less'

const SuccessPolicy = ({
  location, dispatch, successPolicy, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,isMore
  } = successPolicy

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
    item: {},
    visible: modalVisible,
    maskClosable: false,
    // confirmLoading: loading.effects[`user/${modalType}`],
    title:'报价详情',
    footer:null,
    width:'80%',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      console.log(data);
      dispatch({
        type: `user/${modalType}`,
        payload: data,
      })
        .then(() => {
          handleRefresh()
        })
    },
    onCancel () {
      dispatch({
        type: 'successPolicy/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['user/query'],
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
        type: 'successPolicy/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    seeQuotation (item) {
      dispatch({
        type: 'successPolicy/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },

  }

  const filterProps = {
    isMotion,
    isMore,
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
      dispatch({ type: 'user/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'user/multiDelete',
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
      <div className={styles.totalPrice}>
        保险费用合计：<span>3628.50</span>万元
      </div>
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
      {modalVisible && <Offermodal {...modalProps} />}
    </Page>
  )
}

SuccessPolicy.propTypes = {
  successPolicy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ successPolicy, loading }) => ({ successPolicy, loading }))(SuccessPolicy)
