import React from 'react';
import { connect } from 'dva/index'
const Quote = ()=>{
 return (

 )
}
export default connect(({ providerDetail, loading }) => ({ providerDetail, loading }))(AddUser)
