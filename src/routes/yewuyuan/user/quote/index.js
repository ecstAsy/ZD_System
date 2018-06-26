import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Col, Button, Popconfirm } from 'antd';
import { Page } from 'components';
import queryString from 'query-string';
import classnames from 'classnames';
import styles from './index.less';


const Quote = ({
   location, dispatch, quote, loading,
                     }) => {
   location.query = queryString.parse(location.search)
  const { query, pathname } = location;
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,
  } = quote;

  return (
      <Page>
         <div>qwfdwfweew</div>
      </Page>


  )
}

Quote.propTypes = {
  quote: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ quote, loading }) => ({ quote, loading }))(Quote)
