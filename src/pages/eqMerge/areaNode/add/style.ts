import styled from 'styled-components';
import { Form } from 'antd';
export const FormPage = styled(Form)`
  &.ant-form {
    margin-top: 200px;
  }
`;
export const FromButtonItem = styled(Form.Item)`
  &,
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
