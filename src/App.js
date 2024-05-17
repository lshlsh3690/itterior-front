import "./App.css";
import { RouterProvider } from "react-router-dom";
import root from "./routers/root";
import { Provider } from "react-redux";
import store from "./store/store";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

let persistor = persistStore(store);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {/* Redux Provider */}
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={root}></RouterProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
