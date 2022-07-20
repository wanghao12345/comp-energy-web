import styled from 'styled-components';

export const TabMenuContainer = styled.div``;

export const TabsContainer = styled.div`
  background-color: #213464 !important;
  height: 32px;
  .ant-tabs {
    .ant-tabs-nav {
      margin-bottom: 0;
      box-sizing: border-box;
      padding-left: 24px;
      &::before {
        border-color: #438cac;
      }
    }
    .ant-tabs-tab {
      padding: 4px 18px;
      border-radius: 8px 8px 0 0 !important;
      background-color: rgba(33, 52, 100, 100) !important;
      border: 1px solid rgba(42, 95, 117, 100) !important;
      color: white;
      font-size: 14px;
      font-family: SourceHanSansSC-regular;
      position: relative;
      &.ant-tabs-tab-active {
        background-color: rgba(67, 140, 172, 100) !important;
        color: white;
        border: 0 !important;
        .ant-tabs-tab-btn {
          color: white;
        }
        .ant-tabs-tab-remove {
          display: block;
        }
      }
      .ant-tabs-tab-remove {
        position: absolute;
        color: white;
        top: 2px;
        right: 3px;
        display: none;
      }
    }
    .ant-tabs-content-holder {
      display: none;
    }
  }
`;

export const BodyContainer = styled.div`
  box-sizing: border-box;
  padding: 20px;
  height: calc(100vh - 80px);
  background: #142655;
  min-height: 600px;
  overflow: auto;
`;
