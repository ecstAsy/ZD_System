import React from 'react';
import styles from './index.less';
import classnames from 'classnames';
const Title = ({title,sendNote})=>{
  return (
    <div className={classnames(styles.title)}>
      <img src="../ghef_03.png" alt=""/>
      <span>{title}</span>
      {
        title==='最终报价'?<span className='shortNote' onClick={sendNote}>短信通知客户</span>:''
      }
    </div>
  )
}
export default Title
