module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_html_date: (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  is_value_eq: (value1, value2) => {
    return value1 == value2 ? "selected" : ''
  }
};
