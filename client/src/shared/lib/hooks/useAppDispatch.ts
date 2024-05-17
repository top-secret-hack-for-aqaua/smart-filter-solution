import {AppDispatch} from "@shared/lib";
import {useDispatch} from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types