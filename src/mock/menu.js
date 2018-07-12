const { config } = require('./common');

const { apiPrefix } = config;
let database = [
  {
    id: '1',
    icon: 'dashboard',
    name: '今日汇总',
    route: '/dashboard',
  }, {
    id: '2',
    bpid: '1',
    name: '名单查询',
    icon: 'user',
    route: '/user',
  }, {
    id: '21',
    bpid: '2',
    mpid: '-1',
    name: '新增名单',
    icon: 'user',
    route: '/user/add',
  }, {
    id: '22',
    bpid: '2',
    mpid: '-1',
    name: '报价',
    icon: 'user',
    route: '/user/quote',
  }, {
    id: '3',
    bpid: '1',
    name: '名单申请',
    icon: 'user',
    route: '/application',
  }, {
    id: '4',
    bpid: '1',
    name: '成功提交保单',
    icon: 'user',
    route: '/successPolicy',
  }, {
    id: '5',
    bpid: '1',
    name: '通话记录',
    icon: 'phone',
    route: '/record',
  }, {
    id: '6',
    bpid: '1',
    name: '客户投诉',
    icon: 'user',
    route: '/complaint',
  },{
    id: '7',
    bpid: '1',
    name: '团队参数',
    icon: 'setting',
    route: '/parameter',
  },{
    id: '8',
    bpid: '1',
    name: '名单分配',
    icon: 'phone',
    route: '/allocate',
  },{
    id: '9',
    bpid: '1',
    name: '返利申请',
    icon: 'user',
    route: '/rebateapply',
  },{
    id: '10',
    bpid: '1',
    name: '名单回收',
    icon: 'user',
    route: '/listrecovery',
  },{
    id: '11',
    bpid: '1',
    name: '话术管理',
    icon: 'phone',
    route: '/speechcraft',
  },{
    id: '12',
    bpid: '1',
    name: '批单',
    icon: 'phone',
    route: '/batches',
  },{
    id: '13',
    bpid: '1',
    name: '保单登记',
    icon: 'phone',
    route: '/policyRegistration',
  },{
    id: '15',
    bpid: '1',
    name: '团队目标',
    icon: 'setting',
    route: '/teamGoal',
  },
  },{
    id: '14',
    bpid: '1',
    name: '保单审核',
    icon: 'phone',
    route: '/policyAudit',
  }
];

module.exports = {
  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
