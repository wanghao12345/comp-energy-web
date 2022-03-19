import styled from 'styled-components';

export const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const BoardTopContainer = styled.div`
  width: 100%;
  height: 45%;
  box-sizing: border-box;
  border: 1px solid rgba(67, 140, 172, 100);
  border-radius: 4px;
  margin-bottom: 24px;
  padding: 16px 22px;
  display: flex;
  flex-direction: column;
  h3 {
    color: rgba(255, 255, 255);
    font-size: 14px;
  }
  .charts-box {
    flex: 1;
    display: flex;
    .chart-box {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      h4 {
        color: rgba(255, 255, 255);
        font-size: 14px;
      }
      .chart-content-box {
        flex: 1;
        height: 100%;
      }
    }
  }
`;

export const BoardBottomContainer = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
`;

export const BoardBottomLeftContainer = styled.div`
  width: 540px;
  height: 100%;
  margin-right: 24px;
  border: 1px solid rgba(67, 140, 172, 100);
  border-radius: 4px;
`;

export const BoardBottomRightContainer = styled.div`
  flex: 1;
  height: 100%;
  border: 1px solid rgba(67, 140, 172, 100);
  border-radius: 4px;
`;
