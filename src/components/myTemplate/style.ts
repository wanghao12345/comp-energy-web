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
  transition: all 0.3s;
  @media (max-width: 1440px) {
    width: 250px;
  }

  .ant-select {
    width: 100%;
    margin-bottom: 12px;
  }
  .ant-input {
    border-radius: 4px;
  }
  .ant-tree {
    color: #fff;
    margin-top: 12px;
    overflow: auto;
    height: calc(100% - 140px);
  }
  .radioGroup {
    margin: 24px 0 12px 0;
  }
  .site-tree-search-value {
    color: #fff;
  }
`;
