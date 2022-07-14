import styled from 'styled-components';
export const MyHeader = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .menu {
    cursor: pointer;
    font-size: 18px;
    color: #c9c4cc;
    :hover {
      color: #fff;
    }
  }
`;

export const MyHeaderMenuComp = styled.div`
  display: flex;
  align-items: center;
  .icon {
    font-size: 20px;
    cursor: pointer;
  }
  .avatar {
    font-size: 20px;
    margin: 0 8px 0 20px;
  }
`;

export const PersonInfo = styled.div`
  background: #5160a6;
  padding: 5px 0;
  box-sizing: border-box;
  border-radius: 4px;
  div {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover {
      background: #555;
    }
  }
`;
