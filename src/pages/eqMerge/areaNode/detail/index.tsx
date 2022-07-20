import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Button, Select, Switch, message } from 'antd';
import { history } from 'umi';
import { FromButtonItem, FormPage } from './style';
import { addTree, findById } from '@/apis/areaMerge';
import { useImmer } from 'use-immer';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
export default () => {
  const [parentData, setParentData] = useImmer({
    id: '1',
    name: '',
    remark: '',
    isEnable: 1,
  });
  const formRef = useRef<any>();
  useEffect(() => {
    const id = history.location?.query?.id;
    if (id) {
      findById({ id }).then((res) => {
        setParentData((data) => {
          data.id = res.data.id;
          data.name = res.data.name;
          data.remark = res.data?.remark;
          data.isEnable = res.data?.isEnable;
        });
        formRef?.current?.resetFields();
      });
    }
  }, []);
  const onFinish = async (values: any) => {
    const res = await addTree({
      ...values,
      id: parentData.id,
      isEnable: values.isEnable ? 1 : 0,
    });
    if (res?.meta?.code === 200) {
      message.success('操作成功');
      onCancel();
    }
  };
  const onCancel = () => {
    history.go(-1);
  };
  return (
    <FormPage
      ref={formRef}
      {...layout}
      initialValues={{
        name: parentData.name,
        remark: parentData.remark,
        isEnable: parentData.isEnable,
        id: parentData.id,
      }}
      name="control-ref"
      onFinish={onFinish}
    >
      {parentData.id ? (
        <Form.Item name="id" label="节点ID">
          <Input readOnly />
        </Form.Item>
      ) : null}
      {parentData.name ? (
        <Form.Item name="name" label="节点名称">
          <Input readOnly />
        </Form.Item>
      ) : null}
      <Form.Item name="isEnable" label="是否启用" valuePropName="checked">
        <Switch disabled />
      </Form.Item>
      <Form.Item name="remark" label="备注">
        <Input.TextArea
          allowClear
          maxLength={500}
          autoSize={{ minRows: 3, maxRows: 6 }}
          readOnly
        />
      </Form.Item>
      <FromButtonItem>
        <Button htmlType="button" onClick={onCancel} type="primary">
          返回
        </Button>
      </FromButtonItem>
    </FormPage>
  );
};
