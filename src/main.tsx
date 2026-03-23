import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import QueryLayout from "./Layout/QueryLayout.tsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import CartLayout from "./Layout/CartLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryLayout>
      <BrowserRouter>
        <Provider store={store}>
          <CartLayout>
            <App />
          </CartLayout>
        </Provider>
      </BrowserRouter>
    </QueryLayout>
  </StrictMode>,
);
