import React from 'react';
import styles from './index.less';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Title = ({title,sendNote})=>{
  return (
    <div className={classnames(styles.title)}>
      <img src="../ghef_03.png" alt=""/>
      <span className="titleTxt">{title}</span>
      {
        title==='最终报价'?<span className='shortNote' onClick={sendNote}>短信通知客户</span>:''
      }
    </div>
  )
}

Title.propTypes = {
  sendNote : PropTypes.func
};
export default Title
