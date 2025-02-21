// 外部 node_modules 資源
import { useReducer } from "react";
import { RouterProvider } from "react-router-dom";

// 內部 src 資源
import routes from "./routes";
import { initState, MessageContext, messageReducer } from "./store/messageStore";
import Message from "./components/Message";


function App() {
  const reducer = useReducer(messageReducer, initState)
  return (
    <>
      <MessageContext.Provider value={reducer}>
        <Message/>
        <RouterProvider router={routes}/>
      </MessageContext.Provider>
    </>
  );
}

export default App;
