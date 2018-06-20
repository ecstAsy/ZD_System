import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'

const Provider = ({
  location, dispatch, provider, loading, history,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, selectedRowKeys,
  } = provider

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['provider/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        currentPage: page.current,
        pageSize: page.pageSize,
      })
    },
    onEditItem (id) {
      history.push('provider/form/'.concat(id))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'provider/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            currentPage: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
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
      // 进入新增页面
      dispatch({
        type: 'providerDetail/updateState',
        payload: { data: {} },
      })
      history.push('provider/form')
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'provider/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
      .then(() => {
        handleRefresh({
          currentPage: (list.length === selectedRowKeys.length && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        })
      })
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm title="确定要删除它们吗？" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{ marginLeft: 8 }}>Remove</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />
    </Page>
  )
}

Provider.propTypes = {
  provider: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  history: PropTypes.object,
}

export default connect(({ provider, loading }) => ({ provider, loading }))(Provider)
