/**
 * Created by Administrator on 2018/7/2 0002.
 * 团队目标
 */
import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Row, Button, Form ,DatePicker} from 'antd';
import { Page, Editor, Title} from 'components';
import styles from './index.less';
import queryString from 'query-string';
import List from './List';
const { RangePicker } = DatePicker;
const formItemLayoutLong = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
  style: {
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14'
  }
};
const FormItem = Form.Item;
const TeamGoal = ({
  location, dispatch, tamGoal, loading,

}) => {
  location.query = queryString.parse(location.search);
  const { teamData, isEdit, } = tamGoal;

  const isEditFunc = ()=> {
    dispatch({
      type:'tamGoal/isEditFunc'
    })
  };
  const listProps={
    teamData,
    isEdit,
    handleCancelFunc(){
      dispatch({
        type:'tamGoal/isEditFunc'
      })
    },
    saveFunc(data){
        console.log(data);
    }
  };


  return (
    <Page>
      <div className='pageBox'>
        <Row className="page">
            <Button type="Edit" icon="edit" style={{border:0}} onClick={isEditFunc}>编辑</Button>
        </Row>
        <Title title="月业绩目标（万）"/>
      </div>
      <List {...listProps} />
    </Page>

  )
};

TeamGoal.propTypes = {
  tamGoal: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default  connect(({ tamGoal, loading }) => ({ tamGoal, loading }))(TeamGoal)
