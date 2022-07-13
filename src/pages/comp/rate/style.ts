import styled from 'styled-components';

export const RateContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const RateOptionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    .ant-select {
      margin-right: 24px;
    }
    .submitBtn {
      margin-left: 24px;
    }
  }
`;

export const RateBodyContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  margin-top: 24px;
`;

export const RateBodyLeftContainer = styled.div`
  width: 374px;
  height: 100%;
  border: 1px solid rgba(67, 140, 172);
  box-sizing: border-box;
  border-radius: 4px;
  margin-right: 24px;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 56px 45px;
  .rate-item-box {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    h4 {
      color: rgba(255, 255, 255);
      font-size: 18px;
    }
    .rate-chart-box {
      flex: 1;
      height: 100%;
    }
  }
`;

export const RateBodyRightContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const RateBodyRightTopContainer = styled.div`
  width: 100%;
  height: 45%;
  margin-bottom: 24px;
  border: 1px solid rgba(67, 140, 172);
  box-sizing: border-box;
  border-radius: 4px;
`;
export const RateBodyRightBottomContainer = styled.div`
  width: 100%;
  .ant-table {
    .ant-table-thead > tr:not(:last-child) > th[colspan] {
      border-bottom: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
    }
  }
  .table {
    height: calc(100vh - 650px);
    overflow: auto;
  }
`;
