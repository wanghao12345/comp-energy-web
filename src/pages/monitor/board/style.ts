import styled from 'styled-components';

export const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const BoardTopContainer = styled.div`
  width: 100%;
  height: 40%;
  box-sizing: border-box;
  border: 1px solid rgba(67, 140, 172, 100);
  border-radius: 4px;
  margin-bottom: 24px;
  padding: 8px 22px;
  display: flex;
  flex-direction: column;
  min-height: 350px;
  min-width: 700px;
  overflow: auto;
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
  height: 60%;
  display: flex;
`;

export const BoardBottomLeftContainer = styled.div`
  width: 540px;
  height: 100%;
  margin-right: 24px;
  border: 1px solid rgba(67, 140, 172, 100);
  border-radius: 4px;
  flex-shrink: 1;
  overflow: auto;
  min-width: 400px;
  box-sizing: border-box;
  h3 {
    width: 100%;
    height: 42px;
    line-height: 50px;
    text-align: center;
    color: rgba(255, 255, 255);
    font-size: 14px;
  }
  .data-item-box {
    .title-box {
      width: 100%;
      height: 40px;
      background-color: rgba(36, 67, 124);
      box-sizing: border-box;
      padding-left: 24px;
      line-height: 40px;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .item-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 5px 24px;
      &:last-child {
        margin-bottom: 10px;
      }
      span {
        color: rgba(255, 255, 255);
        font-size: 14px;
      }
    }
  }
`;

export const BoardBottomRightContainer = styled.div`
  flex: 1;
  height: 100%;
  border: 1px solid rgba(67, 140, 172, 100);
  border-radius: 4px;
  padding: 16px 22px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .option-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      color: rgba(255, 255, 255);
      font-size: 14px;
    }
    .tab-box {
      width: 50%;
      overflow: auto;
      display: flex;
      height: 70px;
    }
  }
  .charts-box {
    flex: 1;
    height: 100%;
  }
`;
