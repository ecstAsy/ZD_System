/**
 * Created by Administrator on 2018/7/11 0011.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

const InsuranceApplicationModal = ({...InsuranceApplicationModalProps,handleCancel})=>{
  return (
    <Modal className={classnames(styles.NoteModal, styles.InsureInfoModal)}
           {...InsuranceApplicationModalProps}
           footer={[
             <Button  type="primary">保存</Button>,
             <Button onClick={handleCancel}>取消</Button>
           ]}>
      <table border="1" >
        <tr>
          <th colSpan="2">被保险人</th>
          <td colSpan="1">刘媛媛</td>
          <th colSpan="2">被保险人身份证号码（组织机构代码证）</th>
          <td colSpan="2">320922199201036812</td>
        </tr>
        <tr>
          <th colSpan="2">被保险人地址</th>
          <td colSpan="5">江苏省盐城市滨海县滨海港镇友爱村四组68号</td>
        </tr>
        <tr>
          <th colSpan="2">联系人</th>
          <td colSpan="1">刘媛媛</td>
          <th colSpan="2">联系电话</th>
          <td colSpan="2">15895623390</td>
        </tr>
        <tr>
          <th colSpan="2">投保公司</th>
          <td colSpan="5">中国太平洋财产保险股份有限公司（苏州）</td>
        </tr>
        <tr>
          <th rowSpan="4" style={{width:'5%',textIndent:'0',textAlign:'center'}}>
            投<br/>保<br/>机<br/>动<br/>车
          </th>
          <th>被投保人与车辆关系</th>
          <td>
            <select name="" id="" style={{width:'80%',verticalAlign: 'middle'}}>
              <option value="a">所有</option>
              <option value="b">非所有</option>
            </select>
          </td>
          <th>是否足额投保</th>
          <td>
            <select name="" id="" style={{width:'80%',verticalAlign: 'middle'}}>
              <option value="a">是</option>
              <option value="b">否</option>
            </select>
          </td>
          <th>行驶证车主</th>
          <td>刘媛媛</td>
        </tr>
        <tr>
          <th>车牌号码</th>
          <td>苏MNH700</td>
          <th>厂牌型号</th>
          <td>雪佛兰SGM7150DAAA</td>
          <th>核定座位</th>
          <td>5</td>
        </tr>
        <tr>
          <th>整备质量</th>
          <td></td>
          <th>初次登记</th>
          <td>2015-04-20</td>
          <th>使用性质</th>
          <td>家庭自用汽车</td>
        </tr>
        <tr>
          <th>车架号码</th>
          <td>LSGPC52H6FF143292</td>
          <th>新车购置价</th>
          <td>86900</td>
          <th>发动机号</th>
          <td>150660591</td>
        </tr>
        <tr>
          <th colSpan="7" style={{textIndent:'0'}}>
            <span>投保险种</span><span>保险金额/责任限额（万）</span><span>保费（元）</span>
          </th>
        </tr>
        <tr>
          <td colSpan="7" style={{textIndent:'0'}}>
            <p><span>车辆损失险</span><span>5.98</span><span>1096.21</span></p>
            <p><span>第三者责任险</span><span>100.00</span><span>1161.78</span></p>
            <p><span>不计免赔（车损/三责）</span><span>-</span><span>338.70</span></p>
            <p><span>车船税</span><span>-</span><span>300.00</span></p>
            <p><span>交强险</span><span>1200.00</span><span>760.00</span></p>
          </td>
        </tr>
        <tr>
          <td colSpan="7">
            <span className='td_span'>保险期间：</span>
            <span className='td_insurance'>商业险<span className='td_span'>自</span> 2019-09-01 00:00 <span className='td_span'> 起至 </span> 2020-09-01 00:00 <span className='td_span'> 止</span></span>
            <span className='td_insurance'>交强险<span className='td_span'>自</span> 2019-09-01 00:00 <span className='td_span'> 起至 </span> 2020-09-01 00:00 <span className='td_span'> 止</span></span>
          </td>
        </tr>
        <tr>
          <td colSpan="7">
            <span className='td_span'>保险费合计（人民币大写）：</span>
            <span className='td_insurance'>人民币壹仟陆佰捌拾捌元玖角玖分</span>
            <span className='td_insurance' style={{float:'right',marginRight:'10px'}}><span className='td_span'>¥：</span>1688.99<span className='td_span'>元</span></span>
          </td>
        </tr>
        <tr>
          <td colSpan="7">
            <span className='td_span'>特别约定：</span>

          </td>
        </tr>
      </table>
    </Modal>
  )
}
InsuranceApplicationModal.propTypes = {
  handleCancel:PropTypes.func
}
export default InsuranceApplicationModal
