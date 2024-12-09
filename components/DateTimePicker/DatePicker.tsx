import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface CustomDatePickerProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  label?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  label,
}) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      label={label}
      format="DD/MM/YYYY"
      sx={{
        width: "100%",
      }}
      slotProps={{
        textField: {
          helperText: "DD/MM/YYYY",
        },
      }}
    />
  );
};

export default CustomDatePicker;