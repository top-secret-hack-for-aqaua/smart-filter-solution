import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "@shared/lib";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector