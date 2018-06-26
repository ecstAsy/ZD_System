import React from 'react';
import styles from './index.less';
import classnames from 'classnames';
const Title = ({title})=>{
  return (
    <div className={classnames(styles.title)}>
      <img src="./ghef_03.png" alt=""/>
      <span>{title}</span>
    </div>
  )
}
export default Title
