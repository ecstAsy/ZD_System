import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Row, Col, Button, Radio, Tag } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import queryString from 'query-string';
import FilterModal from './FilterModal';
import AllocateListModal from './allocateListModal';
import styles from './index.less';


const ListRecovery = ({location, dispatch, listrecovery, loading,

  })=>{
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { salesMan, FilterModalVisible, FilterValues, allocateListModalVisible, list, pagination } = listrecovery;
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
      type:'listrecovery/showModal',
      payload:{
        modalType:'filter'
      }
    })
  };
  const showAllocateListModal = ()=>{
    dispatch({
      type:'listrecovery/showModal',
      payload:{
        modalType:'allocate'
      }
    })
  };
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
        type:'listrecovery/hideModal',
        payload:{
          modalType:'filter'
        }
      })
    },
    FilterSearch(data){
      dispatch({
        type:'listrecovery/updataFilterValues',
        payload:{
          modalType: 'add',
          data
        }
      })
    }
  };

  const allocateListModalProps = {
    visible : allocateListModalVisible,
    maskClosable: false,
    title:'重新分配',
    width:'50%',
    closable:false,
    FilterValues,
    wrapClassName: 'vertical-center-modal',
    list,
    pagination:false,
    handleCancel(){
      dispatch({
        type:'listrecovery/hideModal',
        payload:{
          modalType:'allocate'
        }
      })
    },
  }
  return (
    <Page inner className={classnames(styles.ListRecovery)}>
      <div className='recoveryInfoList'>
        <span className='recoveryInfoListTitle'>业务员：</span>
        <Radio.Group className='recoveryInfoListContent'>
          {
            salesMan.map((item,i)=>{
              return (
                <Radio value={`${item.name}`}>{item.name}</Radio>
              )
            })
          }
        </Radio.Group>
      </div>
      <div className='recoveryInfoList'>
        <span className='recoveryInfoListTitle'>筛选条件：</span>
        <div className="recoveryInfoListContent">
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
          }<span className='select' onClick={showFilterModal}>选择</span>
        </div>
      </div>
      <div className='recoveryInfoList'>
        <span className='recoveryInfoListTitle'>回收数量：</span>
        <div className="recoveryInfoListContent">
          <span className='detail'>129</span>
        </div>
      </div>
      <div className='recoveryInfoList'>
        <span className='recoveryInfoListTitle'>回收操作：</span>
        <div className="recoveryInfoListContent">
          <Button type="primary" ghost>退回原始库</Button>
          <Button type="primary" ghost onClick={showAllocateListModal}>重新分配</Button>
        </div>
      </div>
      { FilterModalVisible && <FilterModal {...filterModalProps}/> }
      { allocateListModalVisible && <AllocateListModal {...allocateListModalProps}/> }
    </Page>
  )
}
ListRecovery.propTypes = {
  listrecovery: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ listrecovery, loading }) => ({ listrecovery, loading }))(ListRecovery)
