import { Alert } from "antd";
function Button() {
  console.debug("running");
  return (
    <div>
      <button>Button</button>
      <Alert message="Hello World" />
    </div>
  );
}

export default Button;
