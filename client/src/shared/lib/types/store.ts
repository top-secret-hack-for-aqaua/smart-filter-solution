import {store} from "@shared/lib";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch