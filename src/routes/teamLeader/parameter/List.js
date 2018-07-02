/**
 * Created by Administrator on 2018/7/2 0002.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Table, Row, Col } from 'antd'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import styles from './List.less'

const List = () => {
  const ListData = [{name:'周丹',num:'10'},{name:'周丹',num:'10'},{name:'周丹',num:'10'},{name:'周丹',num:'10'},{name:'周丹',num:'10'},{name:'周丹',num:'10'},]
  return (
    <Row>
      <img src="/ghef_03.png"/><span style={{marginLeft:'5px',fontSize:'15px',fontweight:'bold'}}>月业绩目标（万）</span>
      <Row style={{marginBottom:15,marginTop:15}}>
        <div className="listInfoRow">
          <div>请选择月份：</div>
          <p>2018-5</p>
          <p>2018-6</p>
          <p>当月</p>
          <p>2018-8</p>
          <p>2018-9</p>
        </div>
      </Row>

      <Row style={{marginBottom:20,marginTop:15}}>
        {
          ListData.map((list,i)=>{
            return (
              <Col span={6}>
                <div className="useInfoRow">
                  <p>{list.name}</p><p>{list.num}</p>
                </div>
              </Col>
            )
          })
        }
      </Row>
    </Row>
  )
}

List.propTypes = {
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
