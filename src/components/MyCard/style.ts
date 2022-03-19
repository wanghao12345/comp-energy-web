import styled from 'styled-components';
export const MyCardBox = styled.div`
  background-color: #203564;
  border: 1px solid rgba(67, 140, 172, 100);
  border-radius: 4px;
  padding: 20px 24px;
  & > .title {
    position: relative;
    color: rgba(255, 255, 255, 100);
    font-size: 14px;
    &::before {
      position: absolute;
      top: 50%;
      left: -8px;
      content: '';
      transform: translateY(-50%);
      width: 3px;
      height: 14px;
      background-color: rgba(47, 252, 194, 100);
    }
  }
  .childrenBox {
    width: 100%;
    height: calc(100% - 20px);
  }
`;
