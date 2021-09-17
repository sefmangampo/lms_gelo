import React, { useState } from "react";
import Toolbar from "devextreme-react/toolbar";
import MenuPanel from "./MenuPanel";

import config from "devextreme/core/config";

config({
  forceIsoDateParsing: true,
});

export default function Home() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const toolbarItems = [
    {
      widget: "dxButton",
      location: "before",
      options: {
        icon: "menu",
        onClick: () => {
          setIsOpenDrawer((prevState) => !prevState);
        },
      },
    },
  ];

  return (
    <div>
      <MenuPanel />
    </div>
  );
}
