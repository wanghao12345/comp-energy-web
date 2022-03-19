import { RealContainer, RealOptionContainer, RealBodyContainer } from './style';
const RealPage = () => {
  return (
    <RealContainer>
      <RealOption />
      <RealBodyOption />
    </RealContainer>
  );
};

const RealOption = () => {
  return <RealOptionContainer></RealOptionContainer>;
};

const RealBodyOption = () => {
  return <RealBodyContainer></RealBodyContainer>;
};

export default RealPage;
