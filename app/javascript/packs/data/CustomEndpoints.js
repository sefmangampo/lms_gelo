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

const generateIndividualAccruals = async (year) => {
  const link = "generate_individual_accruals";
  const data = { year: year };
  const res = await executeSQL(link, data);
  return res;
};

const executeSQL = async (endpoint = "", data = {}) => {
  const url = "/api/v1/" + endpoint;
  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export { processAccrualQueue, generateIndividualAccruals, generateAccruals };
