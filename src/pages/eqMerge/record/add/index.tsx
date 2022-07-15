import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Switch, DatePicker, message } from 'antd';
import { history } from 'umi';
const { Option } = Select;
import { FromButtonItem } from './style';
import { getTbEquipmentDetail, tbEquipmentAdd } from '@/apis/eqMerge';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
export default () => {
  const [id, setId] = useState<number>();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values);
    const hide = message.loading('正在新增设备...', 50);
    const res = await tbEquipmentAdd({
      ...values,
      isEnable: values.isEnable ? 1 : 0,
      verificationDate: values.verificationDate.format('YYYY-MM-DD HH:mm:ss'),
      manufactureDate: values.manufactureDate.format('YYYY-MM-DD HH:mm:ss'),
    });
    if (res?.meta?.code === 200) {
      hide();
      message.success('新增设备成功！');
      history.go(-1);
    }
  };
  const onCancel = () => {
    history.go(-1);
  };

  useEffect(() => {
    if (window.location.search) {
      const id = parseInt(window.location.search.split('=')[1] || '1');
      setId(id);
      getTbEquipmentDetail({ id: id }).then((res: any) => {
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
    <Form {...layout} name="control-ref" onFinish={onFinish} form={form}>
      <Form.Item name="equipmentCode" label="仪器编号">
        {/* rules={[{ required: true, message: '请输入仪表地址' }]} */}
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        name="model"
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
        name="type"
        label="仪表类型"
        rules={[{ required: true, message: '请选择仪表类型' }]}
      >
        <Select placeholder="请选择" allowClear>
          <Option value="1">male</Option>
          <Option value="2">female</Option>
          <Option value="3">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="仪表名称"
        rules={[{ required: true, message: '请输入仪表名称' }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="regionId" label="节点名称">
        {/* rules={[{ required: true, message: '请输入节点名称' }]} */}
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        name="manufacturer"
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
        name="verificationDate"
        label="检定日期"
        rules={[{ required: true, message: '请输入检定日期' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="verificationCycle"
        label="检定周期"
        rules={[{ required: true, message: '请输入检定周期' }]}
      >
        <Input type="number" placeholder="请输入" />
      </Form.Item>
      <Form.Item name="isEnable" label="是否启用" valuePropName="selected">
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
