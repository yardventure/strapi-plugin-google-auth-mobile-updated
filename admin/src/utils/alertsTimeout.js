const wait = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const TIMEOUT = 3000;

const ERROR = "error";
const SUCCESS = "success";

export { wait, TIMEOUT, ERROR, SUCCESS };
