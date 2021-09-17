const processAccrualQueue = async (year) => {
  const link = "process_accrual_queue";
  const data = { year: year };
  const res = await executeSQL(link, data);
  return res;
};

const generateAccruals = async (year) => {
  const link = "generate_accruals";
  const data = { year: year };
  const res = await executeSQL(link, data);
  return res;
};

const generateReports = async (data) => {
  const link = "reports";
  const res = await executeSQL(link, data);
  return res;
};

const generateIndividualAccruals = async (year) => {
  const link = "generate_individual_accruals";
  const data = { year: year };
  const res = await executeSQL(link, data);
  return res;
};

const loadEmployeesToGroups = async () => {
  const link = "load_employees_to_cut_off_groups";
  const res = await executeSQL(link);
  return res;
};

const generateAccrualSettings = async () => {
  const link = "process_accrual_settings";
  const res = await executeSQL(link);
  return res;
};

const createMultipleCampaigns = async (data) => {
  const link = "campaign_multiple_insert";
  const d = { records: data };
  const res = await executeSQL(link, d);
  return res;
};

const createMultiplePositions = async (data) => {
  const link = "position_multiple_insert";
  const d = { records: data };
  const res = await executeSQL(link, d);
  return res;
};

const createMultipleStatus = async (data) => {
  const link = "employee_status_multiple_insert";
  const d = { records: data };
  const res = await executeSQL(link, d);
  return res;
};

const createMultipleEmploymentStatus = async (data) => {
  const link = "employment_status_multiple_insert";
  const d = { records: data };
  const res = await executeSQL(link, d);
  return res;
};

const createMultipleEmployees = async (data) => {
  const link = "employees_multiple_insert";
  const d = { records: data };
  const res = await executeSQL(link, d);
  return res;
};

const createMultipleLeavees = async (data) => {
  const link = "import_leave_buffer";
  const d = { records: data };
  const res = await executeSQL(link, d);
  return res;
};

const executeSQL = async (endpoint = "", data = {}) => {
  const url = "/api/v1/" + endpoint;

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export {
  processAccrualQueue,
  generateIndividualAccruals,
  generateAccruals,
  loadEmployeesToGroups,
  createMultipleCampaigns,
  createMultipleEmploymentStatus,
  createMultiplePositions,
  createMultipleStatus,
  createMultipleEmployees,
  generateAccrualSettings,
  createMultipleLeavees,
  generateReports,
};
