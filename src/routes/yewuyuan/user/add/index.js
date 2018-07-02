import React from 'react';
import { connect } from 'dva';
import { Page } from 'components';
import styles from './index.less';
import classnames from 'classnames';
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
        <div className={classnames(styles.title)}>
           <img src="../ghef_03.png" alt=""/>
           <span className="info">客户基本信息</span>
        </div>
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
