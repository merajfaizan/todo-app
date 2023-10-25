/* eslint-disable react/prop-types */
const PrivateRoute = ({ children }) => {
  const user = true;
  if (!user) {
    return <h1>Loading...</h1>;
  }
  return children;
};

export default PrivateRoute;
