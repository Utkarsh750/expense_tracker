export function formatDate(timestamp) {
  const date = new Date(parseInt(timestamp));
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const timestamp = 1704067200000;
const formattedDate = formatDate(timestamp);
console.log(formattedDate);

