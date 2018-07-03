import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Button, Popconfirm ,Modal, Icon} from 'antd';
import { Page } from 'components';
import List from './List';
import Lists from './Lists';
import styles from './List.less';
import queryString from 'query-string';


const Parameter = ({
  location, dispatch, parameter, loading,
}) => {
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const {} = parameter;
  return (
    <Page inner>
      <Row style={{ marginBottom: 10, textAlign: 'right', fontSize: 13 }}>
        <Col>
          <Button type="edit" icon="edit" style={{border:0}}>编辑</Button>
        </Col>
      </Row>
      <div>
        <List />
      </div>
      <div>
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
