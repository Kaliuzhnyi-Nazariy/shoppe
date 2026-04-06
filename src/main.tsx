import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import QueryLayout from "./Layout/QueryLayout.tsx";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import CartLayout from "./Layout/CartLayout.tsx";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryLayout>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <CartLayout>
              <App />
            </CartLayout>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </QueryLayout>
  </StrictMode>,
);
