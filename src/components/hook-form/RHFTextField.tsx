import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Input, InputProps, Typography } from "@material-tailwind/react";
import { RefAttributes } from "react";

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
};

type Props = {
  name: string;
} & InputProps &
  RefAttributes<HTMLInputElement>;

export default function RHFTextField({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Input
            {...field}
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value
            }
            error={!!error}
            {...other}
          />
          {!!error && (
            <Typography variant="small" className="text-red-500">
              {error?.message}
            </Typography>
          )}
        </div>
      )}
    />
  );
}
