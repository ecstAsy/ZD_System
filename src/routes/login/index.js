import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input ,Checkbox} from 'antd'
import { config } from 'utils'
import styles from './index.less'
import $ from 'jquery';
const FormItem = Form.Item

const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue,
  },
}) => {
  function handleOk () {
    const data = {
      ...getFieldsValue(),
    };
    if (data['username']==''||data['password']=='') {
        return false;
    }
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }
  const  compare=(rule, value, callback)=>{
    const data = {
      ...getFieldsValue(),
    };
    if (data['username']==''||data['password']=='') {
      $('.buttonok').addClass('disable')
    } else {
      $('.buttonok').removeClass('disable')
    }
  };

  return (
    <div className={styles.loginBox}>
      <div className="title">欢迎使用中德业务系统!</div>
      <div className={styles.form}>
        <div className={styles.logo}>
          {/*<img alt="logo" src={config.logo} />*/}
          <span>用户登录</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message:'用户名不能为空'
                },
              ],
            })(<Input  onKeyUp={compare} onPressEnter={handleOk} placeholder="帐号" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message:'密码不能为空'
                },
              ],
            })(<Input type="password" onKeyUp={compare} onPressEnter={handleOk} placeholder="密码" />)}
          </FormItem>
          <Row>
            <Button type="primary" className='buttonok disable' onClick={handleOk} loading={loading.effects.login}>
              登 录
            </Button>
          </Row>
          <Row className='checkbox'>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住帐号密码</Checkbox>
          )}
          </Row>
        </form>
      </div>
      <div className="des">中德股份汽车投资控股平台</div>
    </div>
  )
};

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Form.create()(Login))
