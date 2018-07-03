/**
 * Created by Administrator on 2018/7/2 0002.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button } from 'antd'
import { Page } from 'components'
import List from './List'
import Lists from './Lists'
import styles from './List.less'
import queryString from 'query-string'


const Parameter = ({
  location, dispatch, parameter, loading,
}) => {
  location.query = queryString.parse(location.search)

  return (
    <Page inner>
      <Row className="page">
          <Button type="edit" icon="edit" style={{border:0}}>编辑</Button>
      </Row>
      <div>
          <List />
          <Lists/>
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
