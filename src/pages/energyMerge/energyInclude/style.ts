import styled from 'styled-components';
import MyCard from '@/components/myCard';
export const PageBox = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .content-box {
    display: flex;
    flex: 1;
    & > div {
      flex: 1;
    }
    .chain-list {
      .chain-row {
        display: flex;
        & > .chain-row-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex: 1;
          margin-top: 8px;
          box-sizing: border-box;
          height: 20px;
          background: #1e325a;
          text-align: center;
          border: 1px solid rgba(67, 140, 172, 100);
          border-radius: 4px;
          height: 105px;
          .title {
            font-size: 24px;
            margin-bottom: 5px;
          }
          .desc {
            opacity: 0.4;
            color: rgba(255, 255, 255, 100);
            font-size: 14px;
          }
        }
        & > .chain-row-item:not(:first-child) {
          margin-left: 8px;
        }
        .trend-box {
          .title {
            width: 100%;
            position: relative;
            font-size: 18px;
            margin-bottom: 0;
          }
          .line::before {
            content: '';
            position: absolute;
            left: 50%;
            bottom: -2px;
            transform: translateX(-50%);
            width: 70%;
            height: 1px;
            background: rgba(115, 115, 115, 100);
          }
        }
      }
    }
  }
`;
export const HeaderFilterBox = styled.div``;
export const LineCartBox = styled(MyCard)`
  height: calc(100vh - 630px);
  min-height: 320px;
  margin: 24px 0;
`;
export const BarCartBox = styled(MyCard)`
  margin-left: 24px;
  position: relative;
  .tabs {
    position: absolute;
    top: 20px;
    right: 50px;
    color: #fff;
    .ant-tag {
      border: 1px solid rgba(44, 254, 194, 68);
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
    }
    .active {
      background-color: rgba(52, 125, 155, 100) !important;
      border-color: rgba(52, 125, 155, 100);
    }
  }
`;
