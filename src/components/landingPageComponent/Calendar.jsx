import React from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, {utils} from "@hassanmojab/react-modern-calendar-datepicker";

const Calendar = ({selectedDayRange, setSelectedDayRange}) => {
  const renderCustomInput = ({ref}) => (
    <input
      readOnly
      ref={ref}
      value={
        selectedDayRange?.from?.day
          ? `${selectedDayRange?.from?.day}/${selectedDayRange?.from?.month}/${
              selectedDayRange?.from?.year
            }${selectedDayRange?.to?.day ? " - " + selectedDayRange?.to?.day + "/" : ""}${
              selectedDayRange?.to?.month ? selectedDayRange?.to?.month + "/" : ""
            }${selectedDayRange?.to?.year ? selectedDayRange?.to?.year : ""}`
          : "Select a date"
      }
      style={{
        textAlign: "center",
        padding: "1rem 1.5rem",
        fontSize: "1.5rem",
        border: "1px solid #9c88ff",
        borderRadius: "100px",
        boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",
        color: "#9c88ff",
        outline: "none",
        height: "20px",
        cursor: "pointer"
      }}
      className="my-custom-input-class" // a styling class
    />
  );

  return (
    <DatePicker
      renderInput={renderCustomInput}
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      inputPlaceholder="Select days"
      shouldHighlightWeekends
      minimumDate={utils().getToday()}
    />
  );
};

export default Calendar;