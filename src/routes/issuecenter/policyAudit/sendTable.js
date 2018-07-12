import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './sendTable.less';

const SendTable = ()=>{
  return (
    <table className={classnames(styles.SendTable)}>
      <tr>
        <td >
          <span className='td_span'>礼品</span>
          <span className='td_insurance'>静电贴x1(0.5)/出险卡</span>
        </td>
      </tr>
      <tr>
        <td>
          <span className='td_span'>派送信息</span>
          <span className='td_insurance'>
              收件人：熊卫平 联系方式：15252644908 付款方式：扫码支付 时间：2018-07-04 地址：江苏省苏州市虎丘区长江路100号
            </span>
        </td>
      </tr>
    </table>
  )
}
SendTable.propTypes = {

}
export default SendTable
