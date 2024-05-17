import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import "@styles/global.scss"
import { router, store, ThemeProvider } from '@shared/lib';
import {App} from "@app/App.tsx";
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ThemeProvider>
            <App>
                <RouterProvider router={router}/>
            </App>
        </ThemeProvider>
    </Provider>
)
