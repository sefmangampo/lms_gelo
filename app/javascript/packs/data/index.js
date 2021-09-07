//import { getEmployees } from "./Employee";
//import { getPaymentModes } from "./PaymentMode";
//import { getCutOffs } from "./CutOffs";
//import { getLeaveStatuses } from "./LeaveStatus";
//import { getLeaveTypes } from "./LeaveTypes";
//import { getEmployeeLeaves } from "./EmployeeLeaves";
//import { getLeaveCredits } from "./LeaveCredits";

import { getStore } from "./Rest";

const getEmployees = getStore("employees");
const getPaymentModes = getStore("payment_mode");
const getCutOffs = getStore("cut_off");
const getLeaveStatuses = getStore("leave_status");
const getLeaveTypes = getStore("leave_types");
const getEmployeeLeaves = getStore("leaves");
const getLeaveCredits = getStore("leave_credits");
const getLeaveAccruals = getStore("leave_accruals");
const getLeaveAccrualSettings = getStore("leave_accrual_settings");
const getLeaveAccrualQueue = getStore("leave_accrual_queue");
const getLeaveAccrualTypes = getStore("leave_accrual_types");
const getCampaigns = getStore("campaign");
const getPositions = getStore("position");
const getUnderTimes = getStore("undertime");

const getActiveStore = async (store, setter, directSub = false, id = "id") => {
  const data = directSub ? data : await store.load();

  const activeData = data.filter((e) => e.active);

  setter({
    store: {
      data: activeData,
      type: "array",
    },
    key: id,
  });
};

const getEmployeeFullName = async (filterActive = false) => {
  const data = await getEmployees.load();

  const newdata = [];

  for (let x = 0; x < data.length; x++) {
    const item = data[x];

    item.name = `${item.lastname}, ${item.firstname} ${item.middlename}`;

    if (!filterActive) {
      newdata.push(item);
    } else {
      if (item.active === true) {
        newdata.push(item);
      }
    }
  }

  console.log("new data", newdata, filterActive);
  return {
    store: {
      data: newdata,
      type: "array",
    },
    key: "id",
  };
};

import { ExcelToJson } from "./ExcelToJson";

export {
  getEmployees,
  getPaymentModes,
  ExcelToJson,
  getCutOffs,
  getLeaveStatuses,
  getLeaveTypes,
  getEmployeeLeaves,
  getLeaveCredits,
  getLeaveAccruals,
  getLeaveAccrualSettings,
  getLeaveAccrualQueue,
  getLeaveAccrualTypes,
  getCampaigns,
  getPositions,
  getActiveStore,
  getUnderTimes,
  getEmployeeFullName,
};
