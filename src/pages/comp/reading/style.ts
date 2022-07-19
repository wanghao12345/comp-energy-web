import styled from 'styled-components';

export const RealContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const RealBodyContainer = styled.div`
  flex: 1;
  height: 100%;
  border: 1px solid rgba(67, 140, 172, 100);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 24px 16px 0 16px;
  overflow: auto;
  .options-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tab-box {
      margin-right: 44px;
      .ant-tabs-nav {
        padding-left: 0;
        margin-bottom: 0;
        &::before {
          display: none;
        }
      }
    }
    .search-box {
      display: flex;
      align-items: center;
      .ant-select {
        margin-right: 16px;
      }
      .ant-picker {
        margin-right: 16px;
      }
    }
  }
  .echart-box {
    width: 100%;
    height: 350px;
  }
  .table-box {
    .ant-table {
      margin-top: 16px;
    }
  }
`;
