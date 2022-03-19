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
  .ant-select {
    width: 100%;
    margin-bottom: 12px;
    .ant-select-selector {
      /* background-color: rgba(52, 125, 155, 20); */
      /* border: 1px solid rgba(67, 140, 172, 60); */
    }
  }
  .ant-input {
    border-radius: 4px;
    /* background-color: rgba(52, 125, 155, 20);
    border: 1px solid rgba(67, 140, 172, 60); */
  }
`;
export const RealBodyContainer = styled.div`
  flex: 1;
  height: 100%;
  border: 1px solid rgba(67, 140, 172, 100);
  border-radius: 4px;
`;
