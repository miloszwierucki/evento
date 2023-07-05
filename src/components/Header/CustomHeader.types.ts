import { Dispatch, SetStateAction } from "react";

export interface IOpenedNav {
  isOpened: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
