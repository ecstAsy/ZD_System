import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import Filter from './Filter'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'



const Application = ({
     location, dispatch, application, loading,
 }) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  };

  const filterProps = {
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  };

  return (
    <Page inner>
      <Filter {...filterProps}/>

      aaa
    </Page>
  )
}

Application.propTypes = {
  application: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ application, loading }) => ({ application, loading }))(Application)
