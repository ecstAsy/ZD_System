import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import queryString from 'query-string';
import styles from './index.less';

const SpeechCraftList = ({item, EditSpeechCraft, allowDrop, drag, endDrop})=>{
  return (
    <div className={classnames(styles.SpeechCraftList)} draggable="true" onDragStart={()=>drag(item)}  id={item.id}  onDragOver={()=>allowDrop(item)} onDragEnd={()=>endDrop(item)}>
      <span className='cicle'></span>
      <span className='title'>{item.name}</span>
      <p><span onClick={()=>EditSpeechCraft(item)}>编辑</span><span>|</span><span>删除</span></p>
    </div>
  )
};

SpeechCraftList.propTypes = {
  EditSpeechCraft:PropTypes.func
}
export default SpeechCraftList
