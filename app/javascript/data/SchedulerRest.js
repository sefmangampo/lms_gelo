import CustomStore from "devextreme/data/custom_store";

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const schedulerDS = async (addedData) => {
  const _store = {
    data: [],
    isLoaded: false,
    needsReload: false,
  };

  const baseURL = "/api/v1/appointments";

  const customStore = new CustomStore({
    key: "id",
    load: () => {
      if (!_store.isLoaded || _store.needsReload) {
        return fetch(baseURL)
          .then(handleErrors)
          .then((response) => {
            _store.isloaded = true;
            _store.needsReload = false;

            _store.data = response.json();

            _store.data.then((x) => {
              if (x.length > 0) return [...addedData, x];

              return addedData;
            });
          })
          .catch((e) => {
            console.log("error", e);
            throw "Network error";
          });
      } else {
        const returData = [..._store.data, addedData];
        console.log("return", returData);
        return returData;
      }
    },
    byKey: (id) => {
      return fetch(baseURL + `/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleErrors)
        .catch(() => {
          throw "Network error";
        });
    },
    insert: (data) => {
      _store.needsReload = true;
      return fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleErrors)
        .catch(() => {
          throw "Network error";
        });
    },
    remove: (data) => {
      _store.needsReload = true;
      return fetch(baseURL + `/${data}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleErrors)
        .catch(() => {
          throw "Network error";
        });
    },
    update: (id, values) => {
      _store.needsReload = true;

      return fetch(baseURL + `/${id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleErrors)
        .catch(() => {
          throw "Network error";
        });
    },
  });

  return customStore;
};
