import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import ReactEcharts from 'echarts-for-react';
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import styles from './pie.less'
const { confirm } = Modal

const Pie = ({
    data,
    title,
}) => {
  location.query = queryString.parse(location.search)
  const getOption={
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color:title!='今日派单'?['#8c9eff','#f4a21a']:['#8c9eff','#ec412b'],
    series: [
      {
        name:'访问来源',
        type:'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:data
      }
    ]
  }



  return (
  <div className={styles.pieBox}>
    <p className="title">{title}</p>
    <div className='pie'>
        <ReactEcharts
          option={getOption}
        />
    </div>
    <div className="numShow">
      {data.map((item,key)=>{
        return <div><span className="dian"></span><span>{item.name}</span><span className="value">{item.value}</span></div>
      })}
    </div>
  </div>
  )
};

Pie.propTypes = {

};

export default Pie
