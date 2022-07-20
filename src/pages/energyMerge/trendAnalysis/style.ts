import styled from 'styled-components';

export const RealContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
export const RealOptionContainer = styled.div`
  height: 100%;
  border: 1px solid rgba(67, 140, 172, 100);
  border-radius: 4px;
  margin-right: 24px;
  box-sizing: border-box;
  padding: 24px 16px;
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
  overflow: auto;
  position: relative;
  .options-box {
    position: sticky;
    top: 0;
    background: #142655;
    z-index: 9;
    .tab-box {
      padding: 24px;
      padding-bottom: 0;
      border-bottom: 1px solid rgba(67, 140, 172, 100);
      .ant-tabs-nav {
        padding-left: 0;
        margin-bottom: 0;
        &::before {
          display: none;
        }
      }
      .ant-tabs-tab.ant-tabs-tab-disabled {
        color: white !important;
        cursor: context-menu;
      }
    }
    .search-box {
      padding: 16px 24px;
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
    height: 300px;
    padding: 0 24px;
  }
  .table-box {
    padding: 24px;
    padding-bottom: 0;
    .ant-table {
      margin-top: 16px;
    }
  }
`;
