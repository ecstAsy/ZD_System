/**
 * Created by Administrator on 2018/7/2 0002.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Button } from 'antd'
import { Page, Editor } from 'components'
import List from './List'
import Lists from './Lists'
import styles from './List.less'
import queryString from 'query-string'

const Parameter = ({
  location, dispatch, parameter, loading,
}) => {
  location.query = queryString.parse(location.search);
  const { ListData, isEdit, handleCancel } = parameter;

  const isEditFunc = ()=> {
    dispatch({
      type:'parameter/isEditFunc'
    })
  };

  const listProps = {
    ListData,
    isEdit
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
      <div>
          <List {...listProps}/>
          <Lists {...listProps}/>
      </div>
      <div>
        {
          isEdit?
            <div className="anniu">
              <Button type="primary">保存</Button><Button onClick={handleCancelFunc}>取消</Button></div>:
            ""
        }
      </div>
    </Page>
  )
}

Parameter.propTypes = {
  parameter: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ parameter, loading }) => ({ parameter, loading }))(Parameter)
