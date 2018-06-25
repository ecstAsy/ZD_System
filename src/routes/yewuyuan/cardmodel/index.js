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


const Cardmodel = ({
  location, dispatch, cardmodel, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType,
  } = cardmodel

  const handleRefresh = (newQuery) => {
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
    addPanelFlag: cardmodel.addCardPanel,
    cardkinds: cardmodel.cardkinds,
    openAddPanel () {
      dispatch({
        type: 'cardmodel/openAddPanel',
      })
    },
    closeAddPanel () {
      dispatch({
        type: 'cardmodel/closeAddPanel',
      })
    },
    subtractCardkind (index) {
      dispatch({
        type: 'cardmodel/subtractCardkind',
        payload: index,
      })
    },
    addCardkind (card) {
      dispatch({
        type: 'cardmodel/addCardkind',
        payload: card,
      })
    },
    onOk (data) {
      data.cardmodelKindRelList = cardmodel.currentItem.cardKindList.map(value => value && { kindId: value.kindId })
      dispatch({
        type: `cardmodel/${modalType}`,
        payload: data,
      })
        .then(() => {
          handleRefresh()
        })
    },
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[`cardmodel/${modalType}`],
    title: `${modalType === 'create' ? '添加卡券包模板' : '更新卡券包模板'}`,
    wrapClassName: 'vertical-center-modal',
    onCancel () {
      dispatch({
        type: 'cardmodel/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['purchase/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        currentPage: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'cardmodel/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            currentPage: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem (item) {
      dispatch({
        type: 'cardmodel/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        currentPage: 1,
      })
    },
    onAdd () {
      dispatch({
        type: 'cardmodel/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

Cardmodel.propTypes = {
  cardmodel: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ cardmodel, loading }) => ({ cardmodel, loading }))(Cardmodel)
