import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import queryString from 'query-string';
import styles from './index.less';
import { Row, Col, Button } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import List from './List';
import FilterModal from './FilterModal';


const AllocateList = ({location, dispatch, allocate, loading})=>{
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list,  FilterModalVisible, pagination } = allocate;
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  };

  const showFilterModal = ()=>{
    dispatch({
      type:'allocate/showModal'
    })
  };

  const filterProps = {
    visible : FilterModalVisible,
    maskClosable: false,
    title:'筛选条件',
    width:'45%',
    closable:false,
    wrapClassName: 'vertical-center-modal',
    handleCancel(){
      dispatch({
        type:'allocate/hideModal'
      })
    }
  }

  const listProps = {
    dataSource: list,
    pagination:false,
    loading: loading.effects['allocate/query']
  };

  return (
    <Page>
      <div className={classnames(styles.selectBox,styles.bg)}>
        <Row gutter={24}>
          <Col span={20}>
            <span className='title'>名单总数：</span><span className='detail'>12789</span>
          </Col>
          <Col span={20}>
            <span className='title'>筛选条件：</span>
            <span className='detail'>无</span>
            <span className='select' onClick={showFilterModal}>选择</span>
          </Col>
        </Row>
      </div>
      <div className={classnames(styles.bg,styles.selectContent)}>
        <Row gutter={24}>
          <Col span={20}>
            <span className='title'>名单总数：</span><span className='detail'>12789</span>
          </Col>
        </Row>
        <List {...listProps}/>
        <Button className='saveBtn'>保存</Button>
      </div>
      { FilterModalVisible && <FilterModal {...filterProps}/>}
    </Page>
  )
}
export default connect(({ allocate, loading }) => ({ allocate, loading }))(AllocateList)
