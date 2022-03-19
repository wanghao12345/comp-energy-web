import { MyCardBox } from './style';
export default (props) => {
  const { title, children } = props;
  return (
    <MyCardBox {...props}>
      {title ? <div className="title">{title}</div> : null}
      <div className="childrenBox">{children}</div>
    </MyCardBox>
  );
};
