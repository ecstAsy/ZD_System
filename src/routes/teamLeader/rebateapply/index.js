import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import queryString from 'query-string';
import Filter from './Filter';
import List from './List';


const RebateApply = ({location, dispatch, rebateapply,   loading,})=>{
   location.query = queryString.parse(location.search);
   const { query, pathname } = location;
   const { list, pagination } = rebateapply;
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
     location,
     FilterSearch (value) {
       handleRefresh({
         ...value,
         page: 1,
       })
     }
   };
  const listProps = {
    dataSource: list,
    loading: loading.effects['rebateapply/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
  };
  return (
    <Page inner>
      <Filter {...filterProps}/>
      <List {...listProps}/>
    </Page>
  )
}
RebateApply.propTypes = {
  rebateapply: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ rebateapply, loading }) => ({ rebateapply, loading }))(RebateApply)
