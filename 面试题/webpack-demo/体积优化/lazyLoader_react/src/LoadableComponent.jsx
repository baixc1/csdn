import React, { useState } from "react";
import loadable from "@loadable/component";
const OtherComponent = loadable(() => import("./OtherComponent.jsx"));
export default function () {
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      <button onClick={setIsShow}>显示</button>
      {isShow ? <OtherComponent /> : null}
    </div>
  );
}
