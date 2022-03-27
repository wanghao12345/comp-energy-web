import React from 'react';
import { Form, Input, Button, Select, Switch, DatePicker } from 'antd';
import { history } from 'umi';
const { Option } = Select;
import { FromButtonItem } from './style';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
export default () => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  const onCancel = () => {
    history.go(-1);
  };
  return (
    <Form {...layout} name="control-ref" onFinish={onFinish}>
      <Form.Item
        name="meterAddress"
        label="仪表地址"
        rules={[{ required: true, message: '请输入仪表地址' }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        name="meterModel"
        label="仪表型号"
        rules={[{ required: true, message: '请选择仪表型号' }]}
      >
        <Select placeholder="请选择" allowClear>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="meterType"
        label="仪表类型"
        rules={[{ required: true, message: '请选择仪表类型' }]}
      >
        <Select placeholder="请选择" allowClear>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="meterName"
        label="仪表名称"
        rules={[{ required: true, message: '请输入仪表名称' }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        name="nodeName"
        label="节点名称"
        rules={[{ required: true, message: '请输入节点名称' }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        name="firm"
        label="生产厂家"
        rules={[{ required: true, message: '请输入生产厂家' }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        name="manufactureDate"
        label="生产日期"
        rules={[{ required: true, message: '请输入生产日期' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="checkDate"
        label="检定日期"
        rules={[{ required: true, message: '请输入检定日期' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="cycle"
        label="检定周期"
        rules={[{ required: true, message: '请输入检定周期' }]}
      >
        <Input type="number" placeholder="请输入" />
      </Form.Item>
      <Form.Item name="flag" label="是否启用" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item name="remark" label="备注">
        <Input.TextArea
          allowClear
          maxLength={500}
          autoSize={{ minRows: 3, maxRows: 6 }}
          placeholder="请输入备注"
        />
      </Form.Item>
      <FromButtonItem>
        <Button htmlType="button" onClick={onCancel}>
          取消
        </Button>
        <Button type="primary" htmlType="submit">
          确认
        </Button>
      </FromButtonItem>
    </Form>
  );
};
