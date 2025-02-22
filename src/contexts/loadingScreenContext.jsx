import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const LoadingScreenContext = createContext();

export const LoadingScreenProvider = ({children}) => {
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);

  return (
    <>
      <LoadingScreenContext.Provider value={{ isLoadingScreen, setIsLoadingScreen}}>
        { children }
      </LoadingScreenContext.Provider>
    </>
  )
}
LoadingScreenProvider.propTypes = {
  children: PropTypes.object,
}