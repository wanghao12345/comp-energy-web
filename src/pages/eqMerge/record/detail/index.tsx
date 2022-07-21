import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Button, Select, Switch, DatePicker, message } from 'antd';
import { history } from 'umi';
const { Option } = Select;
import { CreateOrLookComp, FromButtonItem } from './style';
import {
  getTbEquipmentDetail,
  tbEquipmentAdd,
  updateTbEquipmentDetail,
} from '@/apis/eqMerge';
import { getDictionarySlectOptions, getRegionTreeList } from '@/apis';
import moment from 'moment';
import { PageLoading } from '@ant-design/pro-layout';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
export default () => {
  const [id, setId] = useState<number>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const onCancel = () => {
    history.go(-1);
  };

  const initForm = () => {
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

            if (item === 'isEnable') {
              field[item] = data[item] ? true : false;
            }
            form.setFieldsValue(field);
            setLoading(false);
          });
        }
      });
    }
  };

  const getOptionData = () => {
    const objKeys = ['energy_type'];
    const dictionary: any = {};
    objKeys.map(async (item: string, index: number) => {
      const res: any = await getDictionarySlectOptions({ groupCode: item });
      if (res?.meta?.code === 200) {
        dictionary[item] = res?.data;
      }
      if (objKeys.length - 1 === index) {
        getRegionTreeList().then((res: any) => {
          if (res?.meta?.code === 200) {
            initForm();
          }
        });
      }
    });
  };

  useEffect(() => {
    getOptionData();
  }, []);

  return (
    <CreateOrLookComp>
      {loading ? <PageLoading></PageLoading> : null}
      <Form
        {...layout}
        name="control-ref-detail"
        form={form}
        style={{ display: loading ? 'none' : 'block' }}
      >
        <Form.Item name="equipmentCode" label="设备编号">
          {/* rules={[{ required: true, message: '请输入仪表地址' }]} */}
          <Input readOnly />
        </Form.Item>
        {/* <Form.Item
        name="model"
        label="仪表型号"
        rules={[{ required: true, message: '请选择仪表型号' }]}
      >
        <Select placeholder="请选择" allowClear>
          
        </Select>
      </Form.Item> */}
        <Form.Item name="type" label="仪表类型">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="name" label="仪表名称">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="regionId" label="区域节点">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="manufacturer" label="生产厂家">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="manufactureDate" label="生产日期">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="verificationDate" label="检定日期">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="verificationCycle" label="检定周期">
          <Input readOnly />
        </Form.Item>
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
          <Button onClick={onCancel} size="large" type="primary">
            返回
          </Button>
        </FromButtonItem>
      </Form>
    </CreateOrLookComp>
  );
};
