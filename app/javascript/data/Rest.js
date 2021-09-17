import CustomStore from "devextreme/data/custom_store";
import axios from "axios";

import {
  employeeStore,
  paygroupsStore,
  paymentModeStore,
  campaginsStore,
  cutoffStore,
  leaveAccrualSettingsStore,
  leaveAccrualTypeStore,
  leaveAccrualsStore,
  leaveCreditsStore,
  leaveStatusStore,
  positionStore,
  leavesStore,
  leavetypeStore,
  leaveAccrualQueueStore,
  sexStore,
  statusStore,
  accrualFrequencyStore,
  adjustmentsStore,
  undertimesStore,
  employmentStatusStore,
  appointmentsStore,
} from "./stores";

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const getStore = (url) => {
  const baseURL = "/api/v1/" + url;
  let _store = null;
  switch (url) {
    case "employees":
      _store = employeeStore;
      break;
    case "payment_mode":
      _store = paymentModeStore;
      break;
    case "cut_off":
      _store = cutoffStore;
      break;
    case "leave_status":
      _store = leaveStatusStore;
      break;
    case "leave_types":
      _store = leavetypeStore;
      break;
    case "leaves":
      _store = leavesStore;
      break;
    case "leave_credits":
      _store = leaveCreditsStore;
      break;
    case "leave_accruals":
      _store = leaveAccrualsStore;
      break;
    case "leave_accrual_settings":
      _store = leaveAccrualSettingsStore;
      break;
    case "leave_accrual_queue":
      _store = leaveAccrualQueueStore;
      break;
    case "leave_accrual_types":
      _store = leaveAccrualTypeStore;
      break;
    case "campaign":
      _store = campaginsStore;
      break;
    case "position":
      _store = positionStore;
      break;
    case "undertime":
      _store = undertimesStore;
      break;
    case "accrual_adjustments":
      _store = adjustmentsStore;
      break;
    case "sex":
      _store = sexStore;
      break;
    case "paygroups":
      _store = paygroupsStore;
      break;
    case "accrual_frequency":
      _store = accrualFrequencyStore;
      break;
    case "status":
      _store = statusStore;
      break;
    case "employment_status":
      _store = employmentStatusStore;
      break;
    case "appointments":
      _store = appointmentsStore;
      break;

    default:
      return [];
  }

  const store = new CustomStore({
    key: "id",
    load: () => {
      if (
        !_store.isloaded ||
        _store.needsReload ||
        url == "leave_accrual_queue" ||
        url == "leave_accruals" ||
        url == "leave_credits"
      ) {
        return fetch(baseURL)
          .then(handleErrors)
          .then((response) => {
            _store.isloaded = true;
            _store.needsReload = false;
            _store.data = response.json();
            return _store.data;
          })
          .catch(() => {
            throw "Network error";
          });
      } else {
        return _store.data;
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
        .then((res) => res.json())
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

  return store;
};
