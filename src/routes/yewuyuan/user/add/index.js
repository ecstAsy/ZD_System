import React from 'react';
import { connect } from 'dva';
import { Page, Title } from 'components';
import Filter from './Filter';
import queryString from 'query-string';
import PropTypes from 'prop-types';

const AddUser = ({location, dispatch, add, loading, history})=>{
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const filterProps = {
    history,
    filter: {
      ...query,
    },
    SaveUserInfo (value) {
      handleRefresh({
        ...value,
        currentPage: 1,
      })
    },
  };

  return (
     <Page inner>
       <Title title='客户基本信息'/>
       <Filter {...filterProps}/>
     </Page>
  )
}
AddUser.propTypes = {
  add: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ add, loading }) => ({ add, loading }))(AddUser)
