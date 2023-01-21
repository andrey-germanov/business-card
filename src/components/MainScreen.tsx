import { Link } from "react-router-dom";
import { WrapperApp } from './WrapperApp';

export const MainScreen = () => {
  return (
    <WrapperApp>
      <h1>Welcome</h1>
      <Link to="/builder-card">builder card</Link>
    </WrapperApp>
  );
};
