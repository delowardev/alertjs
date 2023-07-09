import { Options } from "../types.ts";
import { noop } from "./tools.ts";

const options: Options = {
  title: '',
  content: '',
  type: 'success',
  position: 'center',
  confirm: {
    text: 'Confirm',
    on: noop
  },
  cancel: {
    text: 'Cancel',
    on: noop
  }
}

export { options as defaultOptions }
