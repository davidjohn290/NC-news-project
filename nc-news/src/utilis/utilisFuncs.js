const formatDate = (str) => {
  if (str.length === 0) return "";
  else {
    const date = str.split("T");
    const time = date[1].split(".")[0];
    const splitDate = date[0].split("-");

    const formatedDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
    return `${time} on ${formatedDate}`;
  }
};
module.exports = formatDate;
