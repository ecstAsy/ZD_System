/**
 * Created by Administrator on 2018/6/26 0026.
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './offer.less';
import { connect } from 'dva';

const Time = () => {
  return (
    <div>
      <div className={styles.header}>
        <img src="/ghef_03.png"/>
        <span style={{marginLeft:'5px',fontSize:'15px',fontweight:'bold'}}>时间信息</span>
      </div>
      <div>
        <div className="useInfoRow">
          <div>交强险：</div>
          <div className="addresses">2018-6-26 00:00:00<span style={{color:'#8f9090',margin:'5px'}}>至</span>2019-6-26 00:00:00</div>
        </div>
        <div className="useInfoRow">
          <div>车船税：</div>
          <div className="addresses">2018-6-26 00:00:00<span style={{color:'#8f9090',margin:'5px'}}>至</span>2019-6-26 00:00:00</div>
        </div>
      </div>
    </div>
  )
}

export default Time
