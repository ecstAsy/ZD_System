import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page, FilterItem, } from 'components';
import Filter from './Filter'
import { Form, Button, Row, Col, DatePicker } from 'antd';
import queryString from 'query-string';
import styles from './index.less';
import List from './List';
import PolicyMoneyActionModal from './policyActionMoneyModal';
import PolicyActionTimeModal from './policyActionTimeModal';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const  ColPropsLong={
  xs: 24,
  sm: 8,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const formItemLayoutLong = {
  labelCol: {
    span:6,
  },
  wrapperCol: {
    span: 18,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};

const PolicyRegistration = ({
     location, dispatch, policyRegistration, loading,
   }) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location;
  const { list, pagination, PolicyActionMoneyModalVisible, PolicyActionTimeModalVisible, currentItem } = policyRegistration;

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
    FilterSearch (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  };

  const listProps = {
    dataSource: list,
    pagination,
    loading: loading.effects['policyRegistration/query'],
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    handleListAction(payload){
      dispatch({
        type:'policyRegistration/showModal',
        payload
      })
    }
  };

  const policyActionMoneyModalProps = {
    visible : PolicyActionMoneyModalVisible,
    maskClosable: false,
    title:'登记金额',
    width:'40%',
    closable:false,
    currentItem,
    wrapClassName: 'vertical-center-modal',
    handleCancel(){
      dispatch({
        type:'policyRegistration/hideModal'
      })
    }
  };

  const policyActionTimeModalProps={
    visible : PolicyActionTimeModalVisible,
    maskClosable: false,
    width:'30%',
    closable:false,
    currentItem,
    wrapClassName: 'vertical-center-modal',
    handleCancel(){
      dispatch({
        type:'policyRegistration/hideModal'
      })
    }
  };

  return (
    <Page >
      <div className={classnames(styles.wrap)}>
          <Row gutter={24}>
            <Col {...ColPropsLong}>
              <FormItem label="登记时间"  {...formItemLayoutLong}>
                <RangePicker  style={{ width: '70%' }} />
              </FormItem>
            </Col>
            <Col {...ColPropsLong}>
              <FormItem label="缴费时间"  {...formItemLayoutLong}>
                <RangePicker  style={{ width: '70%' }} />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col >
                <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap'}}>
                  <Button type="primary" className="margin-right" style={{width:'100px',height:'35px'}}>下载出单表</Button>
                </div>
            </Col>
          </Row>
      </div>
      <div className={classnames(styles.wrap)}>
        <Filter {...filterProps}/>
        <List {...listProps}/>
      </div>
      {PolicyActionMoneyModalVisible && <PolicyMoneyActionModal {...policyActionMoneyModalProps}/>}
      {PolicyActionTimeModalVisible && <PolicyActionTimeModal {...policyActionTimeModalProps}/>}
    </Page>
  )
}

PolicyRegistration.propTypes = {
  policyRegistration: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ policyRegistration, loading }) => ({ policyRegistration, loading }))(PolicyRegistration)
