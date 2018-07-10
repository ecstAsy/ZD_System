import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page, FilterItem, } from 'components';
import Filter from './Filter'
import { Form, Button, Row, Col, DatePicker } from 'antd';
import queryString from 'query-string';

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
  const { query, pathname, } = location;

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
      <div>
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
                <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' ,marginBottom:'15px'}}>
                  <Button type="primary" className="margin-right" >下载出单表</Button>
                </div>
            </Col>
          </Row>
      </div>
      <Filter {...filterProps}/>
    </Page>
  )
}

PolicyRegistration.propTypes = {
  application: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ policyRegistration, loading }) => ({ policyRegistration, loading }))(PolicyRegistration)
