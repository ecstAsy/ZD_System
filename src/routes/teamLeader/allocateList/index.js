/**
 * Created by Administrator on 2018/7/2 0002.
 * 名单分配
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import queryString from 'query-string';
import styles from './index.less';
import { Row, Col, Button, Tag } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import List from './List';
import FilterModal from './FilterModal';

const AllocateList = ({location, dispatch, allocate, loading})=>{
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list,  FilterModalVisible, pagination, FilterValues } = allocate;

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

  const TagClose = (data)=>{
    dispatch({
      type:'allocate/updataFilterValues',
      payload:{
        modalType: 'cost',
        data
      }
    })
  }

  const filterModalProps = {
    visible : FilterModalVisible,
    maskClosable: false,
    title:'筛选条件',
    width:'45%',
    closable:false,
    FilterValues,
    wrapClassName: 'vertical-center-modal',
    handleCancel(){
      dispatch({
        type:'allocate/hideModal'
      })
    },
    FilterSearch(data){
      dispatch({
        type:'allocate/updataFilterValues',
        payload:{
          modalType: 'add',
          data
        }
      })
    }
  };

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
            {
              FilterValues.map((list,i)=>{
                let name = list.id;
                if(list.name){
                  if(name==='firstRegisterTime' || name==='insuranceExpireTime' ||name==='carSalary'){
                    return (
                      <Tag key={i} className='tag' onClose={()=>TagClose(list)} closable>{`${list.title} : ${list.name[0]}-${list.name[1]}`}</Tag>
                    )
                  }else{
                    return (
                      <Tag key={i} className='tag' onClose={()=>TagClose(list)} closable>{`${list.title} : ${list.name}`}</Tag>
                    )
                  }
                }
              })
            }
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
      { FilterModalVisible && <FilterModal {...filterModalProps}/>}
    </Page>
  )
}
AllocateList.propTypes = {
  allocate: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ allocate, loading }) => ({ allocate, loading }))(AllocateList)
