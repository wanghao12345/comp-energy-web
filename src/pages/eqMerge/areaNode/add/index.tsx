import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Button, Switch, message } from 'antd';
import { history } from 'umi';
import { FromButtonItem, FormPage } from './style';
import { addTree, findById } from '@/apis/areaMerge';
import { useImmer } from 'use-immer';
import { CreateOrLookComp } from '../style';
import { PageLoading } from '@ant-design/pro-layout';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
export default () => {
  const [parentData, setParentData] = useImmer({
    parentId: '1',
    parentName: '',
  });
  const [loading, setLoading] = useState(true);
  const formRef = useRef<any>();
  useEffect(() => {
    const id = (history.location?.query?.parentId as any) || 1;
    if (id) {
      findById({ id }).then((res) => {
        setParentData((data) => {
          data.parentId = res.data.id;
          data.parentName = res.data.name;
        });
        formRef?.current?.resetFields();
        setLoading(false);
      });
    }
  }, []);
  const onFinish = async (values: any) => {
    const res = await addTree({
      ...values,
      parentId: parentData.parentId,
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
    <CreateOrLookComp>
      {loading ? <PageLoading></PageLoading> : null}
      <FormPage
        ref={formRef}
        {...layout}
        initialValues={{ parentName: parentData.parentName }}
        name="control-ref-areaadd"
        onFinish={onFinish}
        style={{ display: loading ? 'none' : 'block' }}
      >
        <Form.Item
          name="name"
          label="节点名称"
          rules={[{ required: true, message: '请输入节点名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        {parentData.parentId ? (
          <Form.Item name="parentName" label="父节点名称">
            <Input disabled placeholder="请输入" style={{ color: '#bdb4b4' }} />
          </Form.Item>
        ) : null}
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
      </FormPage>
    </CreateOrLookComp>
  );
};
