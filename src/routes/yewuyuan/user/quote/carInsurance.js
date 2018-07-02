import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Form, Row, Col, Select, Cascader, Checkbox ,Input ,InputNumber,Button ,Icon} from 'antd';
import Title from './title';
import styles from './index.less';
const FormItem = Form.Item;
const Option = Select.Option;
const ColProps = {
  xs: 24,
  sm: 7,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
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
    fontSize:'14px'
  }
};
const formItemLayout2 = {
  labelCol: {
    span:9,
  },
  wrapperCol: {
    span: 15,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};
const formItemLayou3 = {
  labelCol: {
    span:5,
  },
  wrapperCol: {
    span: 10,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};
const formItemLayou4 = {
  labelCol: {
    span:5,
  },
  wrapperCol: {
    span: 15,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};
const ColProps2 = {
  xs: 24,
  sm: 11,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const ColProps3 = {
  xs: 24,
  sm: 1,
  style: {

  },
};
const CarInsurance = ({
  item = {},
  insuranceData,
  strongInsuranceData,
  choseinsuranceData,
  checkedInsuranceFunc,
  checkedStrongInsurFunc,
  deductiblesModal,
  form:{
    getFieldDecorator,
    getFieldsValue,
    validateFields,
    setFieldsValue,
  }})=>{
  const okData=()=>{
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
    }],
  }];

  const checkedInsurance=(id)=>{
    checkedInsuranceFunc(id)
  };
  const checkedStrongInsurance=(id)=>{
    checkedStrongInsurFunc(id)
  }
  const isShowshangyexian=(key)=>{
    if(key==1){
      if($('.shangyexian').eq(0).hasClass('show')){
        $('.shangyexian').eq(0).removeClass('show');
        $('.double-right').eq(0).removeClass('show')
      }else{
        $('.shangyexian').eq(0).addClass('show');
        $('.double-right').eq(0).addClass('show')
      }
    }else{
      if($('.shangyexian').eq(1).hasClass('show')){
        $('.shangyexian').eq(1).removeClass('show');
        $('.double-right').eq(1).removeClass('show')
      }else{
        $('.shangyexian').eq(1).addClass('show');
        $('.double-right').eq(1).addClass('show')
      }
    }


  };

    return (
      <div className={classnames(styles.Quote)}>
        <Title title={`车险选项`}/>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem {...formItemLayout} label="投保公司" >
              {getFieldDecorator('insuranceCompany',{
                initialValue:'china'
              })(
                <Select showSearch style={{ width: '100%' }} placeholder="请选择" dropdownStyle={{lineHeight:'25px'}} >
                  <Option value="china">太保</Option>
                  <Option value="use">平保</Option>
                </Select> )}
            </FormItem>
          </Col>
          <Col {...ColProps2}>
            <FormItem {...formItemLayout} label="区域" >
              {getFieldDecorator('insuranceAddress',{})(
                <div>
                  <Cascader options={options}  placeholder="请选择" />
                </div>
              )}
            </FormItem>
          </Col>
        </Row>
        <p className='cutLine'></p>
        <Row>
          <Col span={1}></Col>
          <Col span={23}><Checkbox value="A" checked={true}>商业险</Checkbox><Icon onClick={()=>isShowshangyexian(1)} className="double-right show" type="double-right" /></Col>
        </Row>

        <Row className="shangyexian show" >
          <Icon onClick={()=>isShowshangyexian(1)} className="shouqiSy" type="double-right" />
          <Col {...ColProps3}>
            <FormItem  {...formItemLayout2}>
            </FormItem>
          </Col>
          <Col span={11}>
            <FormItem label="商业险折扣" {...formItemLayout2}>
              {getFieldDecorator('zhekou', {
              })(<InputNumber className="leftInput"  />)}
            </FormItem>
          </Col>
          <Col {...ColProps3}>
            <FormItem  {...formItemLayout2}>
            </FormItem>
          </Col>
          <Col span={11}>
            <FormItem label="风险保费" {...formItemLayout2}>
              {getFieldDecorator('baofei', {
              })(<InputNumber className="leftInput" />)}
            </FormItem>
          </Col>
          {insuranceData.map((item,key)=>{
            return (
              <div>
                <Col {...ColProps3}>
                  <FormItem  {...formItemLayout2}>
                    <Checkbox key={key} value={item.id} checked={item.checked} onClick={()=>checkedInsurance(item.id)} ></Checkbox>
                  </FormItem></Col>
                {item.id==25002?(
                  <Col span={11}>
                    <FormItem label={item.name} {...formItemLayout2}>
                      <Select
                        showSearch
                        style={{ width: '35%',background:'none',marginRight:'10px'}}
                        placeholder="请选择"
                        disabled={item.coverageAblead}
                      >
                        <Option value="china">A</Option>
                        <Option value="use">B</Option>
                      </Select>
                      <InputNumber className="leftInput" disabled={item.discount_costAblead}  />
                    </FormItem>
                  </Col>
                ):(
                  item.id==25005?(
                    <Col span={11}>
                      <FormItem label={item.name} {...formItemLayout2}>
                        <Select
                          showSearch
                          style={{ width: '35%',background:'none',marginRight:'10px'}}
                          placeholder="请选择"
                          disabled={item.coverageAblead}
                        >
                          <Option value="china">A</Option>
                          <Option value="use">B</Option>
                        </Select>
                        <InputNumber className="leftInput" disabled={item.discount_costAblead}  />
                      </FormItem>
                    </Col>
                  ):(item.id==25008?(
                    <Col span={11}>
                      <FormItem label={item.name} {...formItemLayout2}>
                        <Select
                          showSearch
                          style={{ width: '35%',background:'none',marginRight:'10px'}}
                          placeholder="请选择"
                          disabled={item.coverageAblead}
                        >
                          <Option value="china">A</Option>
                          <Option value="use">B</Option>
                        </Select>
                        <InputNumber className="leftInput" disabled={item.discount_costAblead}  />
                      </FormItem>
                    </Col>
                  ):(item.id==25010?
                      <Col span={11}>
                        <FormItem label={item.name} {...formItemLayout2}>
                          <InputNumber className="leftInput" disabled={item.coverageAblead}/>
                        </FormItem>
                      </Col>:(item.id==25011? <Col span={20}>
                      <FormItem label={item.name} {...formItemLayou3}>
                        <InputNumber className="leftInput" disabled={item.coverageAblead}/>
                        <span className="choseItem" onClick={deductiblesModal}>
                          {choseinsuranceData.length>0?choseinsuranceData.map((item,key)=>{
                            return(item+'/')
                          }):'请选择'}


                             </span>
                      </FormItem>
                    </Col>:<Col span={11}>
                      <FormItem label={item.name} {...formItemLayout2}>
                        <InputNumber className="leftInput" disabled={item.coverageAblead}/>
                        <InputNumber className="leftInput" disabled={item.discount_costAblead}  />
                      </FormItem>
                    </Col>)
                  ))
                )}
              </div>
            )
          })}
        </Row>
          <Row>
            <Col span={1}></Col>
            <Col span={23}><Checkbox value="B" checked={true}>交强险</Checkbox><Icon onClick={()=>isShowshangyexian(2)} className="double-right show" type="double-right" /></Col>
          </Row>
        <Row className="shangyexian show" >
          <Icon onClick={()=>isShowshangyexian(2)} className="shouqiSy" type="double-right" />
          {strongInsuranceData.map((item,key)=>{
            return (
              <div>
                <Col {...ColProps3}>
                  <FormItem  {...formItemLayout2}>
                    <Checkbox key={key} value={item.id} checked={item.checked} onClick={()=>checkedStrongInsurance(item.id)} ></Checkbox>
                  </FormItem></Col>
                <Col span={11}>
                  <FormItem label={item.name} {...formItemLayou4}>
                    <InputNumber className="leftInput" disabled={item.coverageAblead}  />
                  </FormItem>
                </Col>

              </div>
            )
          })}
        </Row>


      </div>
    )
}
CarInsurance.propTypes = {
  isShowshangyexian: PropTypes.func,
  checkedStrongInsurance: PropTypes.func,
  checkedInsurance: PropTypes.func,
}

export default Form.create() (CarInsurance)
