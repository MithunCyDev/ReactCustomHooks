import { useState, useMemo } from "react";

const useDateFormatter = () => {
  const formatDate = useMemo(
    () => (date) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = String(d.getFullYear()).slice(-2);

      return !isNaN(d.getTime()) ? `${month}/${day}/${year}` : "Invalid Date";
    },
    []
  );

  const increaseOneMonth = useMemo(
    () => (date) => {
      const d = new Date(date);
      const nextMonth = d.getMonth() + 1;
      d.setMonth(nextMonth);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(nextMonth + 1).padStart(2, "0");
      const year = String(d.getFullYear()).slice(-2);

      return !isNaN(d.getTime()) ? `${month}/${day}/${year}` : "Invalid Date";
    },
    []
  );

  return {
    formatDate,
    increaseOneMonth,
  };
};

export default useDateFormatter;

// Example usage:
// const { formatDate, increaseOneMonth } = useDateFormatter();
// const formattedDate = formatDate(new Date());
// const nextMonthDate = increaseOneMonth(new Date());
