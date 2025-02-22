// 外部 node_modules 資源
import { useContext, useReducer } from "react";
import { RouterProvider } from "react-router-dom";

// 內部 src 資源
import routes from "./routes";
import { initState, MessageContext, messageReducer } from "./contexts/messageContext";
import Message from "./components/Message";
import { LoadingScreenProvider } from "./contexts/loadingScreenContext";

function App() {
  const reducer = useReducer(messageReducer, initState);
  
  return (
    <>
      <LoadingScreenProvider>
        <MessageContext.Provider value={reducer}>
          <Message/>
          <RouterProvider router={routes}/>
        </MessageContext.Provider>
      </LoadingScreenProvider>
    </>
  );
}

export default App;