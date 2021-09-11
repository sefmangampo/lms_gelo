export default function generateCodeFromID(id, header) {
  const basenumber = 10000000 + parseInt(id);
  const newcode = basenumber.toString().substring(1);
  const finalcode = header.toUpperCase() + "-" + newcode;

  return finalcode;
}
