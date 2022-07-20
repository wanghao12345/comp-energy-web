import styled from 'styled-components';

export const RealContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
export const RealOptionContainer = styled.div`
  width: 352px;
  height: 100%;
  border: 1px solid rgba(67, 140, 172, 100);
  border-radius: 4px;
  margin-right: 24px;
  box-sizing: border-box;
  padding: 24px 16px;
  min-width: 250px;
  .ant-select {
    width: 100%;
    margin-bottom: 12px;
  }
  .ant-input {
    border-radius: 4px;
  }
  .ant-tree {
    margin-top: 12px;
  }
`;
export const RealBodyContainer = styled.div`
  flex: 1;
  height: 100%;
  border: 1px solid rgba(67, 140, 172, 100);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 24px;
  overflow: auto;
  position: relative;
  .options-box {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    background: rgb(20, 38, 85);
    z-index: 9;
    .tab-box {
      margin-right: 44px;
      @media (max-width: 1440px) {
        margin-right: 20px;
      }
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
      form {
        display: flex;
        align-items: center;
        .ant-form-item {
          margin-bottom: 0;
        }
      }
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
    height: 400px;
    min-height: 350px;
    min-width: 400px;
    margin-bottom: 16px;
  }
  .table-box {
    .ant-table {
      margin-top: 16px;
    }
  }
  .tableHiddle {
    display: none;
  }
`;
