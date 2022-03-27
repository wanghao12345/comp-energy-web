import React from 'react';
import { Form, Input, Button, Select, Switch } from 'antd';
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
        name="eventType"
        label="事件类型"
        rules={[{ required: true, message: '请选择事件类型' }]}
      >
        <Select placeholder="请选择" allowClear>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="areaAddress"
        label="区域位置"
        rules={[{ required: true, message: '请选择区域位置' }]}
      >
        <Select placeholder="请选择" allowClear>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="condition"
        label="能源类型"
        rules={[{ required: true, message: '请选择能源类型' }]}
      >
        <Select placeholder="请选择" allowClear>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="condition"
        label="条件"
        rules={[{ required: true, message: '请选择条件' }]}
      >
        <Select placeholder="请选择" allowClear>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="maxValue"
        label="阀值"
        rules={[{ required: true, message: '请输入阀值' }]}
      >
        <Input type="number" placeholder="请输入" />
      </Form.Item>
      <Form.Item name="conditionTwo" label="条件2">
        <Select placeholder="请选择" allowClear>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item name="maxValueTwo" label="阀值2">
        <Input type="number" placeholder="请输入" />
      </Form.Item>
      <Form.Item
        name="priority"
        label="报警优先级"
        rules={[{ required: true, message: '请选择报警优先级' }]}
      >
        <Select placeholder="请选择" allowClear>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
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
