/**
 * Created by Administrator on 2018/7/2 0002.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import styles from './List.less'

const Lists = () => {
  const ListsDate=[{name:'康耀丽:',num:'100'},{name:'柴璐婵:',num:'100'},{name:'董倩倩:',num:'100'},{name:'蒯红霞:',num:'100'},{name:'康耀丽:',num:'100'},{name:'康耀丽:',num:'100'},{name:'康耀丽:',num:'100'},{name:'康耀丽:',num:'100'}]
  return (
    <Row>
      <img src="/ghef_03.png"/><span className="biaoti">单日跟踪上限</span>
      <Row style={{marginBottom:20,marginTop:15}}>
        {
          ListsDate.map((lists,i)=>{
            return(
              <Col span={6}>
                <div className="useInfoRow">
                  <p>{lists.name}</p><p>{lists.num}</p>
                </div>
              </Col>
            )
          })
        }
      </Row>
    </Row>
  )
}

Lists.propTypes = {
  location: PropTypes.object,
}

export default Lists
