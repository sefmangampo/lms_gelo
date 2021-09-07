import CustomStore from "devextreme/data/custom_store";

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const baseURL = "/api/v1/leave_credits";

export const getLeaveCredits = () => {
  const store = new CustomStore({
    key: "id",
    load: () => {
      return fetch(baseURL)
        .then(handleErrors)
        .then((response) => response.json())
        .catch(() => {
          throw "Network error";
        });
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

  return store;
};
