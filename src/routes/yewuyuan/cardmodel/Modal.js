import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Select, Button, Row, Col } from 'antd'
import Sales from "../dashboard/components/sales";

const FormItem = Form.Item
const { Option } = Select

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  addPanelFlag = false,
  cardkinds = [],
  openAddPanel,
  closeAddPanel,
  subtractCardkind,
  addCardkind,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      onOk(data)
    })
  }

  const handleAddCard = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const payload = { kindId: getFieldsValue().addCardkind }
      for (let cardkind of cardkinds) {
        if (cardkind.value === payload.kindId) {
          payload.kindName = cardkind.label
        }
      }
      addCardkind(payload)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts} okText="确定" cancelText="取消">
      <Form layout="horizontal">
        <FormItem label="名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cardmodelStatus', {
            initialValue: item.cardmodelStatus,
            rules: [
              {
                required: true,
              },
            ],
          })(<Select>
            <Option key="启用">启用</Option>
            <Option key="停用">停用</Option>
          </Select>)}
        </FormItem>
        <FormItem label="备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [{ required: true }],
          })(<Input />)}
        </FormItem>
        <FormItem label="包含卡券" hasFeedback {...formItemLayout}>
          {item.cardKindList && item.cardKindList.map((cardKind, key) => (cardKind && <Row key={key} gutter={16}>
            <Col span={18}>{ cardKind.kindName }</Col>
            <Col span={6}><Button onClick={() => subtractCardkind(key)} icon="close" type="dashed" /></Col>
          </Row>))}
          {addPanelFlag ? (
            <Row gutter={16}>
              <Col span={18}>
                {getFieldDecorator('addCardkind', {
                  rules: [{ required: true }],
                })(<Select placeholder="卡券包模板名称">
                  {cardkinds.map((cardkind, key) => <Option key={key} value={cardkind.value}>{ cardkind.label }</Option>)}
                </Select>)}
              </Col>
              <Col span={3}>
                <Button onClick={handleAddCard} icon="check" />
              </Col>
              <Col span={3}>
                <Button onClick={closeAddPanel} icon="close" type="dashed" />
              </Col>
            </Row>
          ) : <Button type="primary" onClick={openAddPanel} icon="plus" />}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  addCardkind: PropTypes.func,
  form: PropTypes.object.isRequired,
  cardkinds: PropTypes.array,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  addPanelFlag: PropTypes.bool,
  openAddPanel: PropTypes.func,
  closeAddPanel: PropTypes.func,
  subtractCardkind: PropTypes.func,
}

export default Form.create()(modal)
