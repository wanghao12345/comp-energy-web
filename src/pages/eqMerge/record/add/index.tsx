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
  const [optionObj, setOptionObj] = useState<any>();
  const [loading, setLoading] = useState(true);
  const regionList = useRef<any>();

  const onFinish = async (values: any) => {
    if (id) {
      const hide = message.loading('正在更新...', 50);
      updateTbEquipmentDetail({
        ...values,
        id: id,
        isEnable: values.isEnable ? 1 : 0,
        verificationDate: values.verificationDate.format('YYYY-MM-DD'),
        manufactureDate: values.manufactureDate.format('YYYY-MM-DD'),
      }).then((res: any) => {
        hide();
        if (res?.meta?.code === 200) {
          message.success('更新成功！');
          history.go(-1);
        }
      });
    } else {
      const hide = message.loading('正在新增设备...', 50);
      tbEquipmentAdd({
        ...values,
        isEnable: values.isEnable ? 1 : 0,
        verificationDate: values.verificationDate.format('YYYY-MM-DD'),
        manufactureDate: values.manufactureDate.format('YYYY-MM-DD'),
      }).then((res: any) => {
        hide();
        if (res?.meta?.code === 200) {
          message.success('新增设备成功！');
          history.go(-1);
        }
      });
    }
  };
  const onCancel = () => {
    history.go(-1);
  };

  const initForm = (obj?: any) => {
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
            if (item.includes('Date') && data[item]) {
              field[item] = moment(data[item]);
            }
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
    setLoading(true);
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
            formatSelectOption(res?.data);
            dictionary.regionList = regionList.current;
            setOptionObj(dictionary);
            initForm(dictionary);
            if (!window.location.search) {
              setLoading(false);
            }
          }
        });
      }
    });
  };

  const formatSelectOption = (data: []) => {
    data.map((item: any) => {
      if (item?.children && item?.children.length) {
        formatSelectOption(item?.children);
        regionList.current.push({
          key: item?.name,
          value: item?.id,
        });
      } else {
        regionList.current.push({
          key: item?.name,
          value: item?.id,
        });
      }
    });
  };

  useEffect(() => {
    regionList.current = [];
    getOptionData();
  }, []);

  return (
    <CreateOrLookComp>
      {loading ? <PageLoading></PageLoading> : null}
      <Form
        {...layout}
        name="control-ref"
        onFinish={onFinish}
        form={form}
        style={{ display: loading ? 'none' : 'block' }}
      >
        <Form.Item name="equipmentCode" label="设备编号">
          {/* rules={[{ required: true, message: '请输入仪表地址' }]} */}
          <Input placeholder="请输入" />
        </Form.Item>
        {/* <Form.Item
        name="model"
        label="仪表型号"
        rules={[{ required: true, message: '请选择仪表型号' }]}
      >
        <Select placeholder="请选择" allowClear>
          
        </Select>
      </Form.Item> */}
        <Form.Item
          name="type"
          label="仪表类型"
          rules={[{ required: true, message: '请选择仪表类型' }]}
        >
          <Select placeholder="请选择" allowClear>
            {optionObj
              ? optionObj.energy_type.map((item: any) => {
                  return (
                    <Option value={parseInt(item.value)} key={item.value}>
                      {item.key + '表'}
                    </Option>
                  );
                })
              : null}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="仪表名称"
          rules={[{ required: true, message: '请输入仪表名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="regionId" label="区域节点">
          {/* rules={[{ required: true, message: '请输入节点名称' }]} */}
          <Select placeholder="请选择" allowClear>
            {optionObj
              ? optionObj.regionList.map((item: any) => {
                  return (
                    <Option value={item.value} key={item.value}>
                      {item.key}
                    </Option>
                  );
                })
              : null}
          </Select>
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
    </CreateOrLookComp>
  );
};
