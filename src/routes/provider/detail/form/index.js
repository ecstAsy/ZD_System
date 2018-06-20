import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Row, Col, Form, Button, Input, TimePicker, Upload, Icon, message, Modal } from 'antd'

import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmap'

const FormItem = Form.Item

const { TextArea } = Input

const timeFormat = 'HH:mm'

import { connect } from 'dva'
import styles from './index.less'

const DetailForm = ({
  history,
  previewImg = {},
  dispatch,
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  const backList = () => {
    history.push('/provider')
  }
  const removeImg = (key) => {
    const data = { ...item }
    data[key] = null
    dispatch({
      type: 'providerDetail/updateState',
      payload: {
        data,
      },
    })
  }
  const showPreviewImg = (url) => {
    dispatch({
      type: 'providerDetail/updateState',
      payload: {
        previewImg: {
          visible: true,
          url,
        },
      },
    })
  }
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  )
  const colsePreviewImg = () => {
    dispatch({
      type: 'providerDetail/updateState',
      payload: {
        previewImg: {
          visible: false,
          url: '',
        },
      },
    })
  }
  const uploadFile = ({ file, fileList, event }, key) => {
    if (file.status === 'done') {
      const data = { ...item }
      data[key] = file.response && file.response.data && file.response.data.uuid
      dispatch({
        type: 'providerDetail/updateState',
        payload: {
          data,
        },
      })
    }
  }
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      data.beginTime = data.beginTime && data.beginTime.format('HHmm')
      data.endTime = data.endTime && data.endTime.format('HHmm')
      onOk({
        ...item,
        ...data,
      })
    })
  }
  const markAddress = (e) => {
    const data = { ...item }
    data.longitude = e.point.lng
    data.latitude = e.point.lat
    dispatch({
      type: 'providerDetail/updateState',
      payload: {
        data,
      },
    })
  }
  return (
    <Form>
      <Modal visible={previewImg.visible} footer={null} onCancel={colsePreviewImg}>
        <img alt="example" style={{ width: '100%' }} src={previewImg.url} />
      </Modal>
      <Row style={{ marginRight: '20px' }}>
        <Col span={12}>
          <FormItem
            label="名称"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入门店名称!' }],
              initialValue: item.name,
            })(<Input />)}
          </FormItem>
          <FormItem
            label="LOGO图片"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Upload action="http://0.0.0.0:8000/api_1/image/uploadImage"
              listType="picture-card"
              showUploadList={false}
              onRemove={() => removeImg('logoImg')}
              onPreview={() => showPreviewImg(item.logoImg)}
              onChange={({ file, fileList, event }) => {
                uploadFile({ file, fileList, event }, 'logoImg')
              }}
            >
              {item.logoImg ? <img width={100} src={item.logoImg} alt="avatar" /> : uploadButton}
            </Upload>
          </FormItem>
          <FormItem
            label="联系人"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
          >
            {getFieldDecorator('linkMan', {
              rules: [{ required: true, message: '请输联系人名称!' }],
              initialValue: item.linkMan,
            })(<Input />)}
          </FormItem>
          <FormItem
            label="联系电话1"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
          >
            {getFieldDecorator('phone1', {
              rules: [{ required: true, message: '请输联系电话!' }],
              initialValue: item.phone1,
            })(<Input />)}
          </FormItem>
          <FormItem
            label="联系电话2"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
          >
            {getFieldDecorator('phone2', {
              initialValue: item.phone2,
            })(<Input />)}
          </FormItem>
          <FormItem
            label="营业时间"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
          >
            <Col span={11}>
              {getFieldDecorator('beginTime', {
                rules: [{ required: true, message: '请选择开始营业时间!' }],
                initialValue: item.beginTime ? moment(item.beginTime, 'HHmm') : moment('0830', 'HHmm'),
              })(<TimePicker format={timeFormat} />)}
            </Col>
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>-</span>
            </Col>
            <Col span={11}>
              {getFieldDecorator('endTime', {
                rules: [{ required: true, message: '请选择结束营业时间!' }],
                initialValue: item.endTime ? moment(item.endTime, 'HHmm') : moment('1800', 'HHmm'),
              })(<TimePicker format={timeFormat} />)}
            </Col>
          </FormItem>
          <FormItem
            label="详细地址"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            {getFieldDecorator('address', {
              rules: [{ required: true, message: '请填写详细地址!' }],
              initialValue: item.address,
            })(<Input />)}
          </FormItem>
          <FormItem
            label="门店描述"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            {getFieldDecorator('descr', {
              rules: [{ required: true, message: '请填写门店描述!' }],
              initialValue: item.descr,
            })(<TextArea rows={6} />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label="门店图片"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Row>
              <Col span={8}>
                <Upload action="http://0.0.0.0:8000/api_1/image/uploadImage"
                  listType="picture-card"
                  showUploadList={false}
                  onChange={({ file, fileList, event }) => {
                    uploadFile({ file, fileList, event }, 'img1')
                  }}
                >
                  {item.img1 ? <img width={100} src={item.img1} alt="avatar" /> : uploadButton}
                </Upload>
              </Col>
              <Col span={8}>
                <Upload action="http://0.0.0.0:8000/api_1/image/uploadImage"
                  listType="picture-card"
                  showUploadList={false}
                  onChange={({ file, fileList, event }) => {
                    uploadFile({ file, fileList, event }, 'img2')
                  }}
                >
                  {item.img2 ? <img width={100} src={item.img2} alt="avatar" /> : uploadButton}
                </Upload>
              </Col>
              <Col span={8}>
                <Upload action="http://0.0.0.0:8000/api_1/image/uploadImage"
                  listType="picture-card"
                  showUploadList={false}
                  onChange={({ file, fileList, event }) => {
                    uploadFile({ file, fileList, event }, 'img3')
                  }}
                >
                  {item.img3 ? <img width={100} src={item.img3} alt="avatar" /> : uploadButton}
                </Upload>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Upload action="http://0.0.0.0:8000/api_1/image/uploadImage"
                  listType="picture-card"
                  showUploadList={false}
                  onChange={({ file, fileList, event }) => {
                    uploadFile({ file, fileList, event }, 'img4')
                  }}
                >
                  {item.img4 ? <img width={100} src={item.img4} alt="avatar" /> : uploadButton}
                </Upload>
              </Col>
              <Col span={8}>
                <Upload action="http://0.0.0.0:8000/api_1/image/uploadImage"
                  listType="picture-card"
                  showUploadList={false}
                  onChange={({ file, fileList, event }) => {
                    uploadFile({ file, fileList, event }, 'img5')
                  }}
                >
                  {item.img5 ? <img width={100} src={item.img5} alt="avatar" /> : uploadButton}
                </Upload>
              </Col>
              <Col span={8}>
                <Upload action="http://0.0.0.0:8000/api_1/image/uploadImage"
                  listType="picture-card"
                  showUploadList={false}
                  onChange={({ file, fileList, event }) => {
                    uploadFile({ file, fileList, event }, 'img6')
                  }}
                >
                  {item.img6 ? <img width={100} src={item.img6} alt="avatar" /> : uploadButton}
                </Upload>
              </Col>
            </Row>
          </FormItem>
          <FormItem
            label="所在位置"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Map center="苏州" zoom="11" events={{ click: markAddress }} >
              {
                item.longitude && item.latitude && <Marker position={{ lng: item.longitude, lat: item.latitude }} />
              }
              <NavigationControl />
            </Map>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={2}></Col>
        <Col span={2}>
          <Button size="large" onClick={backList}>
            返回
          </Button>
        </Col>
        <Col span={2}>
          <Button size="large" type="primary" onClick={handleOk}>
            提交
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

DetailForm.propTypes = {
  history: PropTypes.object,
  previewImg: PropTypes.object,
  dispatch: PropTypes.func,
  item: PropTypes.object,
  onOk: PropTypes.func,
  form: PropTypes.object,
}

const DetailFormIns = Form.create()(DetailForm)

const Detail = ({
  providerDetail, history, dispatch, loading,
}) => {
  const formProps = {
    history: history,
    previewImg: providerDetail.previewImg,
    dispatch,
    item: providerDetail.data,
    onOk (data) {
      if (data.id) {
        dispatch({
          type: 'providerDetail/update',
          payload: data,
        }).then(() => {
          message.info('更新成功！')
        })
      } else {
        dispatch({
          type: 'providerDetail/create',
          payload: data,
        }).then(() => {
          history.push('../provider')
        })
      }
    },
  }

  return (
    <DetailFormIns {...formProps} />
  )
}

Detail.propTypes = {
  providerDetail: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ providerDetail, loading }) => ({ providerDetail, loading }))(Detail)
