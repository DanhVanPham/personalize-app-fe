import { MARKET_OPTIONS } from "@/utils/constants";
import { Typography, Select, Option } from "@material-tailwind/react";
import { RHFTextField } from "../hook-form";
import React from "react";
import { useFormContext } from "react-hook-form";

type PropertyItemProps = {
  title: string;
  name: string;
  placeholder?: string;
  valueRender?: () => React.ReactNode;
  [x: string]: any;
};

const PropertyItem = ({
  title,
  name,
  placeholder,
  valueRender,
  ...rest
}: PropertyItemProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Typography variant="h6">{title}</Typography>
      {valueRender ? (
        valueRender()
      ) : (
        <RHFTextField
          name={name}
          size="lg"
          placeholder={placeholder}
          className="  focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          {...rest}
        />
      )}
    </div>
  );
};

const MutateCoinContent = () => {
  const { watch, setValue } = useFormContext();
  const imageUrl = watch("img");
  const marketWatch = watch("market");

  const handleChange = (key: any, value: any) => {
    setValue(key, value);
  };

  return (
    <div className="mb-1 flex flex-col gap-2">
      <PropertyItem
        title="Digital Asset"
        name="digitalAsset"
        placeholder="BTCUSDT"
      />
      <PropertyItem
        title="Market"
        name="market"
        valueRender={() => (
          <Select
            value={marketWatch}
            onChange={(value) => handleChange("market", value)}
          >
            {MARKET_OPTIONS.map((market) => (
              <Option key={market.id} value={market.value}>
                {market.label}
              </Option>
            ))}
          </Select>
        )}
      />
      <PropertyItem title="Detail" name="detail" placeholder="Bitcoin/USDT" />
      <PropertyItem
        title="Image"
        name="img"
        valueRender={() => (
          <div className="flex flex-1 items-center gap-4 text-left">
            <RHFTextField
              name="img"
              size="lg"
              placeholder="Enter url image"
              className="  w-full focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <img
              src={imageUrl || ""}
              alt="Image coin"
              className="h-10 w-10 rounded-md border p-1"
            />
          </div>
        )}
      />
      <PropertyItem title="Quantity" name="quantity" type="number" />
      <PropertyItem title="Price" name="price" type="number" />
    </div>
  );
};

export default MutateCoinContent;
