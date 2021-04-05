
export function createQueryFromOptions(selectedOption) {
  let query = ""
  for (let i = 0, len = selectedOption.length - 1; i < len; i++) {
    query += selectedOption[i].value + ","
  }
  query += selectedOption[selectedOption.length - 1].value
  return query
}