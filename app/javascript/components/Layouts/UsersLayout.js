import React from "react";
import Button from "devextreme-react/button";
import { confirm } from "devextreme/ui/dialog";

export default function UsersLayout() {
  const signOut = async () => {
    const url = window.location.origin + "/users/sign_out";
    let result = await confirm("<i>Are you sure?</i>", "Sign Out");

    if (result) {
      const res = await fetch(url, {
        method: "GET",
      });

      if (res.ok) {
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <Button text="Sign Out" onClick={signOut} />
    </div>
  );
}
