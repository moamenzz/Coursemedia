import { NavigateFunction } from "react-router-dom";

export let navigate: NavigateFunction = () => {};

export const setNavgiate = (fn: NavigateFunction) => (navigate = fn);
