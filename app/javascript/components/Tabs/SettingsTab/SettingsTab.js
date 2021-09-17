import React, { useState } from "react";

import { SettingsMenu } from "../../SideMenu";

import { UsersLayout, PreferencesLayout } from "../../Layouts";

import css from "./Settings.module.scss";

export default function SettingsTab() {
  const [selectedItem, setSelectedItem] = useState(1);
  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <SettingsMenu setSelectedItem={setSelectedItem} />
      </div>
      <div className={css.contentbar}>
        {selectedItem === 1 && <UsersLayout />}
        {selectedItem === 2 && <PreferencesLayout />}
      </div>
    </div>
  );
}
