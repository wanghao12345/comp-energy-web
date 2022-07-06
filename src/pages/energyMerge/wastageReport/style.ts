import styled from 'styled-components';
import MyCard from '@/components/myCard';
export const Page = styled(MyCard)`
  height: 100%;
  .search-box {
    margin-bottom: 33px;
    display: flex;
    align-items: center;
    .ant-select {
      margin-right: 16px;
    }
    .ant-picker {
      margin-right: 16px;
    }
  }
`;
