import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Switch, message } from 'antd';
import { FromButtonItem, FormPage } from './style';
import { updateRegionById, findById } from '@/apis/areaMerge';
import { history } from 'umi';
import { getRegionTreeList } from '@/apis';
import { CreateOrLookComp } from '../style';
import { PageLoading } from '@ant-design/pro-layout';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
export default () => {
  const [form] = Form.useForm();
  const [id, setId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [regionList, setRegionList] = useState<any>([
    { key: '根', value: '0' },
  ]);
  const [isRoot, setRoot] = useState(false);
  const onFinish = async (values: any) => {
    const res = await updateRegionById({
      ...values,
      id: id,
      isEnable: values.isEnable ? 1 : 0,
    });
    if (res?.meta?.code === 200) {
      message.success(res?.meta?.msg);
      onCancel();
    }
  };

  const getRegionListAndInitForm = () => {
    getRegionTreeList().then((res: any) => {
      if (res?.meta?.code === 200) {
        formatSelectOption(res?.data);
        setRegionList([...regionList]);
        initForm();
      }
    });
  };

  const formatSelectOption = (data: []) => {
    data.map((item: any) => {
      if (item?.children && item?.children.length) {
        formatSelectOption(item?.children);
        regionList.push({
          key: item?.name,
          value: item?.id,
        });
      } else {
        regionList.push({
          key: item?.name,
          value: item?.id,
        });
      }
    });
  };

  const initForm = () => {
    if (window.location.search) {
      const id = parseInt(window.location.search.split('=')[1] || '1');
      setId(id);
      findById({ id }).then((res) => {
        if (res?.meta?.code === 200) {
          const data = res?.data;
          const keys = Object.keys(data);
          keys.map((item) => {
            const field: any = {};
            field[item] = data[item];

            if (item === 'isEnable') {
              field[item] = data[item] ? true : false;
            }
            if (item === 'parentId') {
              if (data[item] === '0') {
                setRoot(true);
              }
            }
            form.setFieldsValue(field);
            setLoading(false);
          });
        }
      });
    }
  };
  const onCancel = () => {
    history.go(-1);
  };

  useEffect(() => {
    getRegionListAndInitForm();
  }, []);

  return (
    <CreateOrLookComp>
      {loading ? <PageLoading></PageLoading> : null}
      <FormPage
        form={form}
        {...layout}
        name="control-ref-areaedit"
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
        <Form.Item name="parentId" label="父节点名称">
          <Select placeholder="请选择" disabled={isRoot}>
            {regionList.map((item: any) => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.key}
                </Option>
              );
            })}
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
      </FormPage>
    </CreateOrLookComp>
  );
};
