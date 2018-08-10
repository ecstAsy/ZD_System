import React from 'react';
import Title from './title';
import classnames from 'classnames';
import styles from './index.less';
import moment from 'moment';
import { Form, Row, Col, DatePicker, Button } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span:4,
  },
  wrapperCol: {
    span: 20,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};
const ColProps = {
  xs: 24,
  sm: 16,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};

const TimeInfo = ({currentItem, ...TimeInfoprops,
  form: { getFieldDecorator, getFieldsValue, setFieldsValue }
})=>{

  const licopy=()=>{
    const obj1 = getFieldsValue().liStartDate;
    const cliStartDate = obj1;
    const obj2 = getFieldsValue().liEndDate;
    const cliEndDate = obj2;
    console.log(cliStartDate,cliEndDate)
  };

  function onChange(value) {
    console.log('changed', value);
  };

  return (
    <div className={classnames(styles.Quote,styles.TimeInfo)}>
      <Title title={`时间信息`}/>
      <Row gutter={24}>
        <Col {...ColProps}>
          <FormItem {...formItemLayout} label="交强险">
            <div>
              {getFieldDecorator('liStartDate',{
                initialValue:moment(currentItem.liStartDate)
              })(
                <DatePicker
                  id="liStart" showTime format="YYYY-MM-DD  HH:mm:ss" />
              )}
              <span className="cutTxt">至</span>
              {getFieldDecorator('liEndDate',{
                initialValue:moment(currentItem.liEndDate)
              })(
                <DatePicker
                  id="liEnd" showTime format="YYYY-MM-DD  HH:mm:ss" />
              )}
              <Button className="timeBtn" >同下</Button>
            </div>
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...ColProps}>
          <FormItem {...formItemLayout} label="商业险" >
              <div>
                {getFieldDecorator('cliStartDate',{
                  initialValue:moment(currentItem.cliStartDate)
                })(
                  <DatePicker
                    onChange={onChange}
                    id="cliStart" showTime format="YYYY-MM-DD  HH:mm:ss" />
                )}
                <span className="cutTxt">至</span>
                {getFieldDecorator('cliEndDate',{
                  initialValue:moment(currentItem.cliEndDate)
                })(
                  <DatePicker
                    id="cliEnd" showTime format="YYYY-MM-DD  HH:mm:ss" />
                )}
                <Button className="timeBtn" onClick={licopy}>同上</Button>
              </div>
          </FormItem>
        </Col>
      </Row>
    </div>
  )
}
export default Form.create()(TimeInfo)
