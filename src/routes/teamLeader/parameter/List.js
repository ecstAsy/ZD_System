/**
 * Created by Administrator on 2018/7/2 0002.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Form, Input, Tabs } from 'antd'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import styles from './List.less'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const formItemLayout = {
  labelCol: {
    span:10,
  },
  wrapperCol: {
    span: 14,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'15'
  }
};
const List = ({...listProps, ListData, isEdit,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue }
}) => {
  return (
    <Row>
      <img src="/ghef_03.png"/><span className="biaoti">月业绩目标（万）</span>
      <Row style={{marginBottom:15,marginTop:15}}>
        <div className="card-container">
          <Tabs type="card" defaultActiveKey="3" size="large">
            <TabPane disabled tab={<span style={{color:'#8f9090'}}>请选择月份 : </span>} ></TabPane>
            <TabPane tab="2018-5" key="1" >
                {
                  ListData.map((list,i)=>{
                    return (
                      <Col span={6}>
                        <div>
                          {
                            !isEdit? <div className="useInfoRow"><p>{list.name}</p><p>{list.num}</p></div>:
                              <FormItem  {...formItemLayout} label={list.name}>
                                {getFieldDecorator('num',{
                                  initialValue:list.num
                                })(<Input />)}
                              </FormItem>
                          }
                        </div>
                      </Col>
                    )
                  })
                }
            </TabPane>

            <TabPane tab="2018-6" key="2">
                {
                  ListData.map((list,i)=>{
                    return (
                      <Col span={6}>
                        <div>
                          {
                            !isEdit? <div className="useInfoRow"><p>{list.name}</p><p>{list.num}</p></div>:
                              <FormItem  {...formItemLayout} label={list.name}>
                                {getFieldDecorator('num',{
                                  initialValue:list.num
                                })(<Input />)}
                              </FormItem>
                          }
                        </div>
                      </Col>
                    )
                  })
                }
            </TabPane>

            <TabPane tab="当月" key="3">
                {
                  ListData.map((list,i)=>{
                    return (
                      <Col span={6}>
                        <div>
                          {
                            !isEdit? <div className="useInfoRow"><p>{list.name}</p><p>{list.num}</p></div>:
                              <FormItem  {...formItemLayout} label={list.name}>
                                {getFieldDecorator('num',{
                                  initialValue:list.num
                                })(<Input />)}
                              </FormItem>
                          }
                        </div>
                      </Col>
                    )
                  })
                }
            </TabPane>

            <TabPane tab="2018-7" key="4">
                {
                  ListData.map((list,i)=>{
                    return (
                      <Col span={6}>
                        <div>
                          {
                            !isEdit? <div className="useInfoRow"><p>{list.name}</p><p>{list.num}</p></div>:
                              <FormItem  {...formItemLayout} label={list.name}>
                                {getFieldDecorator('num',{
                                  initialValue:list.num
                                })(<Input />)}
                              </FormItem>
                          }
                        </div>
                      </Col>
                    )
                  })
                }
            </TabPane>

            <TabPane tab="2018-8" key="5">
                {
                  ListData.map((list,i)=>{
                    return (
                      <Col span={6}>
                        <div>
                          {
                            !isEdit? <div className="useInfoRow"><p>{list.name}</p><p>{list.num}</p></div>:
                              <FormItem  {...formItemLayout} label={list.name}>
                                {getFieldDecorator('num',{
                                  initialValue:list.num
                                })(<Input />)}
                              </FormItem>
                          }
                        </div>
                      </Col>
                    )
                  })
                }
            </TabPane>
            </Tabs>
        </div>
      </Row>
    </Row>
  )
}

List.propTypes = {
  location: PropTypes.object,
}

export default Form.create() (List)
