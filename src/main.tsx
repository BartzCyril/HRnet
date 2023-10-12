import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from "./pages/App.tsx";
import "bootstrap/dist/css/bootstrap.css"
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./utils/slice/employeeSlice.ts";
import {Error} from "./pages/Error.tsx";
import {CurrentEmployees} from "./pages/CurrentEmployees.tsx";

const router = createBrowserRouter([
    {
        path: '/vite-react-router/',
        element: <App />,
        errorElement: <Error />,
    },
    {
        path: '/vite-react-router/employee-list',
        element: <CurrentEmployees/>
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
