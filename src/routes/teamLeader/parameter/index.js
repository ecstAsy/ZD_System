/**
 * Created by Administrator on 2018/7/2 0002.
 * 团队参数
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Button, Form } from 'antd';
import { Page, Editor, Title } from 'components';
import List from './List';
import Lists from './Lists';
import Mouth from './mouthDate';
import styles from './List.less';
import queryString from 'query-string';

const FormItem = Form.Item;
const Parameter = ({
  location, dispatch, parameter, loading,
}) => {
  location.query = queryString.parse(location.search);
  const { ListData, isEdit, handleCancel, mouthDate, currentItem } = parameter;

  const isEditFunc = ()=> {
    dispatch({
      type:'parameter/isEditFunc'
    })
  };

  const listProps = {
    ListData,
    isEdit
  };

  const mouthProps = {
    loading,
    mouthDate,
    width:'45%',
    currentItem:currentItem,
    choseDesId(item){
      dispatch({
        type: 'parameter/choseDesId',
        payload: item,
      })
    }
  };

  const handleCancelFunc = () => {
    dispatch({
      type:'parameter/isEditFunc'
    })
  };

  return (
    <Page inner>
      <Row className="page">
        <Button type="Edit" icon="edit" style={{border:0}} onClick={isEditFunc}>编辑</Button>
      </Row>
      <Title title="月业绩目标（万）"/>
      <Mouth {...mouthProps} />
      <List {...listProps}/>
      <Title title="单日跟踪上限"/>
      <Lists {...listProps}/>
      <div>
        {
          isEdit?
            <div className="anniu">
              <Button type="primary" style={{marginLeft:10,width:80}}>保存</Button>
              <Button onClick={handleCancelFunc} style={{marginLeft:10,width:80}}>取消</Button></div>:
            ""
        }
      </div>
    </Page>
  )
};


Parameter.propTypes = {
  parameter: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ parameter, loading }) => ({ parameter, loading }))(Parameter)
