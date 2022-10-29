import React from "react";
export const LoadingComponent = ({ children, isLoaded }) => {
  return <>{isLoaded ? <>{children}</> : <p>در حال بارگیری...</p>}</>;
};
export default LoadingComponent;
