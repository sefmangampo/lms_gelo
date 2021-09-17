import { getStore } from "./Rest";
import {
  generateAccruals,
  processAccrualQueue,
  generateIndividualAccruals,
  loadEmployeesToGroups,
  generateAccrualSettings,
  createMultipleLeavees,
  generateReports,
} from "./CustomEndpoints";

import { schedulerDS } from "./SchedulerRest";

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
const getAdjustments = getStore("accrual_adjustments");
const getCutOffGroups = getStore("employee_cut_off_groups");
const getCutOffGroupMembers = getStore("employee_cut_off_group_members");
const getSexes = getStore("sex");
const getPayGroups = getStore("paygroups");
const getAccrualFrequency = getStore("accrual_frequency");
const getStatus = getStore("status");
const getEmploymentStatus = getStore("employment_status");
const getAppointments = getStore("appointments");

const getActiveStore = async (store, setter, directSub = false, id = "id") => {
  const data = directSub ? data : await store.load();

  const activeData = data.filter((e) => e.active);

  setter({
    store: {
      data: activeData,
      type: "array",
    },
    key: id,
    paginate: true,
    pageSize: 10,
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

  return {
    store: {
      data: newdata,
      type: "array",
    },
    key: "id",
    paginate: true,
    pageSize: 10,
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
  getAdjustments,
  generateAccruals,
  processAccrualQueue,
  generateIndividualAccruals,
  getCutOffGroupMembers,
  getCutOffGroups,
  loadEmployeesToGroups,
  getSexes,
  getAccrualFrequency,
  getPayGroups,
  getStatus,
  getEmploymentStatus,
  generateAccrualSettings,
  createMultipleLeavees,
  generateReports,
  getAppointments,
  schedulerDS,
};
