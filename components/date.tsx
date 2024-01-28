import React from "react";

interface ProjectProps {
  startDate: Date | string; // Allow startDate to be either Date or string
}

const RoadMapDate: React.FC<ProjectProps> = ({ startDate }) => {
  // Ensure startDate is a Date object
  const startDateObject =
    startDate instanceof Date ? startDate : new Date(startDate);

  // Extract day and month components
  const day = startDateObject.toLocaleString("en-US", { day: "2-digit" });
  const month = startDateObject.toLocaleString("en-US", { month: "short" });

  // Custom format: day month
  const formattedStartDate = `${day} ${month}`;

  return <>{formattedStartDate}</>;
};

export default RoadMapDate;
