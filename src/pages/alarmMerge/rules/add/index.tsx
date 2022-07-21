import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Button, Select, Switch, message } from 'antd';
import { history } from 'umi';
const { Option } = Select;
import { FromButtonItem } from './style';
import {
  tbEarlyWarningAdd,
  tbEarlyWarningselectById,
  tbEarlyWarningupdateById,
} from '@/apis/event';
import { getDictionarySlectOptions, getRegionTreeList } from '@/apis';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
export default () => {
  const [form] = Form.useForm();
  const [optionObj, setOptionObj] = useState<any>();
  const [lianDongOption, SetLdOption] = useState<any>();

  const regionList = useRef<any>();
  const onFinish = (values: any) => {
    const hide = message.loading('正在新增规则...', 50);
    if (id) {
      tbEarlyWarningupdateById({
        ...values,
        isEnable: values?.isEnable ? 1 : 0,
        id: id,
      }).then((res: any) => {
        if (res?.meta?.code === 200) {
          message.success('更新成功！');
          setTimeout(() => {
            history.go(-1);
          }, 300);
        }
        hide();
      });
    } else {
      tbEarlyWarningAdd({
        ...values,
        isEnable: values?.isEnable ? 1 : 0,
      }).then((res: any) => {
        if (res?.meta?.code === 200) {
          message.success('新增成功!');
          setTimeout(() => {
            history.go(-1);
          }, 300);
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
    regionList.current = [];
    getOptionData();
  }, []);

  const initForm = (obj: any) => {
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
            if (item === 'energyParameter') {
              onChangeEnergy(data.equipmentTypeName, obj);
            }
            form.setFieldsValue(field);
          });
        }
      });
    }
  };

  const getOptionData = () => {
    const objKeys = [
      'energy_type',
      'event_type',
      'on_or_off',
      'param_type_energy',
      'param_type_gas_air',
      'param_type_gas_natural',
      'param_type_gas_nitrogen',
      'param_type_gas_steam',
      'param_type_water',
      'event_condition',
    ];
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
            console.log(dictionary);
            setOptionObj(dictionary);
            initForm(dictionary);
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

  const onChangeEnergy = (option: any, obj: any) => {
    let switchValue = option;
    if (typeof option !== 'string') {
      switchValue = option.children;
    }
    let data = obj.param_type_energy;
    switch (switchValue) {
      case '电':
        data = obj.param_type_energy;
        break;
      case '水':
        data = obj.param_type_water;
        break;
      case '蒸汽':
        data = obj.param_type_gas_steam;
        break;
      case '天然气':
        data = obj.param_type_gas_natural;
        break;
      case '空气':
        data = obj.param_type_gas_air;
        break;
      case '氮气':
        data = obj.param_type_gas_nitrogen;
        break;
      default:
        data = obj.param_type_energy;
    }
    if (data) {
      SetLdOption(data);
    }
    if (typeof option !== 'string') {
      form.setFieldsValue({ energyParameter: parseInt(data[0].value) });
    }
  };

  return (
    <Form {...layout} form={form} name="control-ref" onFinish={onFinish}>
      <Form.Item
        name="eventType"
        label="事件类型"
        rules={[{ required: true, message: '请选择事件类型' }]}
      >
        <Select placeholder="请选择" allowClear>
          {optionObj
            ? optionObj.event_type.map((item: any) => {
                return (
                  <Option value={parseInt(item.value)} key={item.value}>
                    {item.key}
                  </Option>
                );
              })
            : null}
        </Select>
      </Form.Item>
      <Form.Item
        name="regionId"
        label="区域位置"
        rules={[{ required: true, message: '请选择区域位置' }]}
      >
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
        name="name"
        label="仪表名称"
        rules={[{ required: true, message: '请输入' }]}
      >
        <Input type={'text'} placeholder={'请输入名称'}></Input>
      </Form.Item>
      <Form.Item
        name="equipmentType"
        label="能源类型"
        rules={[{ required: true, message: '请选择能源类型' }]}
      >
        <Select
          placeholder="请选择"
          allowClear
          onChange={(value, option) => onChangeEnergy(option, optionObj)}
        >
          {optionObj
            ? optionObj.energy_type.map((item: any) => {
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
        name="energyParameter"
        label="参数"
        rules={[{ required: true, message: '请选择能源参数' }]}
      >
        <Select placeholder="请选择" allowClear>
          {lianDongOption
            ? lianDongOption.map((item: any) => {
                return (
                  <Option value={parseInt(item.value)} key={item.value}>
                    {item.key}
                  </Option>
                );
              })
            : null}
        </Select>
      </Form.Item>
      <Form.Item
        name="condition1"
        label="条件"
        rules={[{ required: true, message: '请选择条件' }]}
      >
        <Select placeholder="请选择" allowClear>
          {optionObj
            ? optionObj.event_condition.map((item: any) => {
                return (
                  <Option value={parseInt(item.value)} key={item.value}>
                    {item.key}
                  </Option>
                );
              })
            : null}
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
          {optionObj
            ? optionObj.event_condition.map((item: any) => {
                return (
                  <Option value={parseInt(item.value)} key={item.value}>
                    {item.key}
                  </Option>
                );
              })
            : null}
        </Select>
      </Form.Item>
      <Form.Item name="threshold2" label="阀值2">
        <Input type="number" placeholder="请输入" />
      </Form.Item>
      {/* <Form.Item
        name="priority"
        label="报警优先级"
        rules={[{ required: true, message: '请选择报警优先级' }]}
      >
        <Select placeholder="请选择" allowClear>
          <Option value={1}>低</Option>
          <Option value={2}>中</Option>
          <Option value={3}>高</Option>
        </Select>
      </Form.Item> */}
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
