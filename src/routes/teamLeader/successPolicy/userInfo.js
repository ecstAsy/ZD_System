import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import styles from './offer.less'



const UserInfo = ({

})=>{
  const remarks=[
    {id:1,data:'20180311',des:'备注1'},
    {id:2,data:'20180517',des:'备注2'},
    {id:3,data:'20180613',des:'备注3'},
  ]

  return (
    <div>
      <div className={styles.header}> <img src="/ghef_03.png"/><span style={{marginLeft:'5px',fontSize:'15px'}}>客户信息</span></div>
      <div className="useInfoRow">
        <p>姓名：</p> <p>刘媛媛</p><p>身份证号：</p><p>325928199015451910</p>
      </div>
      <div className="useInfoRow">
        <p>联系电话：</p> <p>18662511029</p><p>车牌：</p><p>苏EH7F67</p>
      </div>
      <div className="useInfoRow">
        <p>厂牌型号：</p> <p>别克威朗ASDFD4656</p><p>车架号：</p><p>SFERGTRGHTR5451910</p>
      </div>
      <div className="useInfoRow">
        <p>发动机号：</p> <p>46456456</p><p>核定座位：</p><p>5</p>
      </div>
      <div className="useInfoRow">
        <p>初登日期：</p> <p>2018-08-09</p><p>保险到期日：</p><p>2019-08-09</p>
      </div>
      <div className="useInfoRow">
        <p>上年投保公司：</p> <p>太保</p><p>使用性质：</p><p>家庭自用汽车</p>
      </div>
      <div className="useInfoRow">
        <p>车辆种类：</p> <p>6座以下</p><p>新车购置价：</p><p>118564.00</p>
      </div>
      <div className="useInfoRow">
        <div>备注：</div>
        <div className='remarks'>
            <div className='line'>
                <div className='mokuai'>
                    <span></span>
                    <p className="date">2018.03.11</p>
                </div>
              <div className='mokuai'>
                <span></span>
                <p className="date">2018.03.11</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
