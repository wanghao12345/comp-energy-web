import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Switch, message } from 'antd';
import { history } from 'umi';
const { Option } = Select;
import { FromButtonItem } from './style';
import { typeList } from '@/commonInterface';
import {
  tbEarlyWarningAdd,
  tbEarlyWarningselectById,
  tbEarlyWarningupdateById,
} from '@/apis/event';
import { optionsData } from '@/pages/monitor/real/data';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
export default () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    const hide = message.loading('正在新增规则...', 50);
    if (id) {
      tbEarlyWarningupdateById({
        ...values,
        isEnable: values?.isEnable ? 1 : 0,
        id: id,
      }).then((res: any) => {
        if (res?.meta?.code === 200) {
          message.success(id ? '更新成功！' : '新增成功!');
          history.go(-1);
        }
        hide();
      });
    } else {
      tbEarlyWarningAdd({
        ...values,
        isEnable: values?.isEnable ? 1 : 0,
      }).then((res: any) => {
        if (res?.meta?.code === 200) {
          message.success(id ? '更新成功！' : '新增成功!');
          history.go(-1);
        }
        hide();
      });
    }
  };
  const [id, setId] = useState<number>();
  const onCancel = () => {
    history.go(-1);
  };
  useEffect(() => {
    if (window.location.search) {
      const id = parseInt(window.location.search.split('=')[1] || '1');
      setId(id);
      tbEarlyWarningselectById({ id: id }).then((res: any) => {
        if (res?.meta?.code === 200) {
          const data = res?.data;
          const keys = Object.keys(data);
          keys.map((item) => {
            const field: any = {};
            field[item] = data[item];
            form.setFieldsValue(field);
          });
        }
      });
    }
  }, []);

  return (
    <Form {...layout} form={form} name="control-ref" onFinish={onFinish}>
      <Form.Item
        name="eventType"
        label="事件类型"
        rules={[{ required: true, message: '请选择事件类型' }]}
      >
        <Select placeholder="请选择" allowClear>
          <Option value={1}>类型1</Option>
          <Option value={2}>类型2</Option>
          <Option value={3}>类型3</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="regionId"
        label="区域位置"
        rules={[{ required: true, message: '请选择区域位置' }]}
      >
        <Select placeholder="请选择" allowClear>
          <Option value={1}>A1</Option>
          <Option value={2}>A2</Option>
          <Option value={3}>B2</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="energy"
        label="能源类型"
        rules={[{ required: true, message: '请选择能源类型' }]}
      >
        <Select placeholder="请选择" allowClear>
          {typeList.map((item) => {
            return (
              <Option value={item.value} key={item.value}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="energyParameter"
        label="参数"
        rules={[{ required: true, message: '请选择能源参数' }]}
      >
        <Select placeholder="请选择" allowClear>
          {optionsData[0].map((item, index) => {
            return (
              <Option value={index} key={index}>
                {item}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="condition1"
        label="条件"
        rules={[{ required: true, message: '请选择条件' }]}
      >
        <Select placeholder="请选择" allowClear>
          <Option value={1}>大于</Option>
          <Option value={2}>小于</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="threshold1"
        label="阀值"
        rules={[{ required: true, message: '请输入阀值' }]}
      >
        <Input type="number" placeholder="请输入" />
      </Form.Item>
      <Form.Item name="condition2" label="条件2">
        <Select placeholder="请选择" allowClear>
          <Option value={1}>大于</Option>
          <Option value={2}>小于</Option>
        </Select>
      </Form.Item>
      <Form.Item name="threshold2" label="阀值2">
        <Input type="number" placeholder="请输入" />
      </Form.Item>
      <Form.Item
        name="priority"
        label="报警优先级"
        rules={[{ required: true, message: '请选择报警优先级' }]}
      >
        <Select placeholder="请选择" allowClear>
          <Option value={1}>低</Option>
          <Option value={2}>中</Option>
          <Option value={3}>高</Option>
        </Select>
      </Form.Item>
      <Form.Item name="isEnable" label="是否启用" valuePropName="checked">
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
