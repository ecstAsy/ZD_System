import Mock from 'mockjs';
import config from '../utils/config';

const { apiPrefix } = config;

let applicationListData = Mock.mock({
  'data|80-100':[
    {
      'id|+1': 1,
      name:'@cname',
      userPhone:/^1[34578]\d{9}$/,
      'insuranceCompany|1' : ['人保/苏州/人保1','人保/常州/人保2','人保/无锡/人保3','人保/南京/人保4','人保/江阴/人保1'],
      carPlate : /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
      batchTime : '@datetime("yyyy-MM-dd")',
      paymentTime:'@datetime("yyyy-MM-dd")',
      registerTime:'@datetime("yyyy-MM-dd")',
      applyTime : '@datetime("yyyy-MM-dd")',
      submissionTime:'@datetime("yyyy-MM-dd HH:mm:ss")',
      sendTime:'@datetime("yyyy-MM-dd")',
      createTime: '@datetime("yyyy-MM-dd")',
      handleTime:'@datetime("yyyy-MM-dd")',
      'complaintStatus|1':['返现驳回','','未处理','返现通过'],
      'cpType|1':['礼品投诉','返现投诉'],
      cpDecription:'返现100元',
      'team|1' :['团队1','团队2','团队3','团队4','团队5','团队6','团队7','团队8'] ,
      'salesman|1':['业务员1','业务员2','业务员3','业务员4'],
      'processor|1':['业务员1','业务员2','业务员3','业务员4'],
      'area|1' :['苏州','南京','无锡','常州','江阴','常熟','昆山'] ,
      'registrant|1':['出单登记','财务登记'],
      'policyStatus|1':['待审核','审核通过','退保'],
      'auditStatus|1':['待审核','审核通过','审核失效',],
      'applyStatus|1':['驳回','已报价','未处理','同意'],
      'policyAction|1':['修改缴费日期','登记缴费日期','修改登记金额'],
      'internalCar|1':['是','否'],
      'payWay|1':['扫码支付','转账至保险公司'],
      'customerType|1':['A','B'],
      'costNum|0-500.2':1,
      'commercialNum|2000-5000.2' : 1,
      'compulsoryNum|2000-5000.2' : 1,
      'registerStatus|1':['登记完整','-'],
      'registrationAmountStatus|1':['未登记','-'],
      'policyScene|1':['苏州OB','苏州XB'],
      'existence|1':['存在','不存在'],
      'insuranceNum|900-5000.2' : 1,
      'vehicleVesselTax|100-1000.2':1,
      'firstCallWilldo|0-100':1,
      'firstCallDone|0-100': 1,
      'reserveWilldo|0-100': 1,
      'reserveDone|0-100': 1,
      'todayTrack|0-100': 1,
      'todayAllocate|0-100': 1,
      'rebateRatio|14-28.1-10': 1,
      'overTopNum|150-300.1-10' : 1,
      'heightRatio|14-34.1-10' : 1,
      rebateType : '保单申请',
      'rebateStatus|1' : ['驳回','未处理','同意','上级申请中'],
      'rebateRemark|1' : ['没超','正常'],
      batchInfo:'京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领，京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领',
      remark:'京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领,京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领'
    }
  ]
})

let database = applicationListData.data;
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }
  let data;
  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item;
      break;
    }
  }
  if (data) {
    return data;
  }
  return null;
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
};

module.exports ={
  [`GET ${apiPrefix}/generalData`] (req, res) {
    const { query } = req;
    let { pageSize, page, ...other } = query;
    pageSize = pageSize || 10;
    page = page || 1;
    let newData = database;
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }
    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  }
}
