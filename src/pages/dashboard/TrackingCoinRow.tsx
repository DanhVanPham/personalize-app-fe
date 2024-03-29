import { isNil } from "lodash";
import { IconButton, Typography } from "@material-tailwind/react";
import { TrashIcon, CloudArrowDownIcon } from "@heroicons/react/24/solid";
import { fThousandSeparator, roundNumber } from "@/utils/helpers";

type TrackingCoinRowProps = {
  data: {
    digitalAsset: string;
    detail: string;
    img?: string | null;
    quantity: number;
    price: number;
    // currentPrice: number;
  };
  classes: string;
};

const prefixValue = (value?: string | number | null, prefix = "$") => {
  if (isNil(value)) return null;
  return `${prefix}${value}`;
};

const TrackingCoinRow = ({ data, classes }: TrackingCoinRowProps) => {
  const { digitalAsset, detail, img, quantity, price } = data;
  const currentPrice = 0;
  const differ = currentPrice - price;
  const isIncrease = differ >= 0;

  const amountOldPrice = prefixValue(
    fThousandSeparator(roundNumber(currentPrice * quantity)),
  );
  const amountDiffPrice = prefixValue(
    fThousandSeparator(roundNumber(differ * quantity)),
  );

  return (
    <tr key={digitalAsset}>
      <td className={classes}>
        <div className="flex items-center gap-4 text-left">
          <img
            src={img || ""}
            alt={digitalAsset}
            className="h-10 w-10 rounded-md border p-1"
          />
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="!font-semibold"
            >
              {digitalAsset}
            </Typography>
            <Typography variant="small" className="!font-normal text-gray-600">
              {detail}
            </Typography>
          </div>
        </div>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          className="text-right !font-normal text-gray-600"
        >
          {fThousandSeparator(quantity)}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          className="text-right !font-normal text-gray-600"
        >
          {prefixValue(fThousandSeparator(price))}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          className="text-right !font-normal text-gray-600"
        >
          {prefixValue(fThousandSeparator(currentPrice))}
        </Typography>
      </td>
      <td className={classes}>
        <div className="flex flex-col items-end justify-center gap-1">
          <Typography
            variant="small"
            color={isIncrease ? "green" : "red"}
            className="text-right text-xs !font-bold"
          >
            {`${isIncrease ? "+" : "-"}${amountDiffPrice}`}
          </Typography>
          <Typography
            variant="small"
            className="text-right !font-normal text-gray-600"
          >
            {amountOldPrice}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <div className="flex justify-end gap-2">
          <IconButton variant="text" size="sm">
            <TrashIcon className="h-5 w-5 text-red-500" />
          </IconButton>
          <IconButton variant="text" size="sm">
            <CloudArrowDownIcon className="h-5 w-5 text-gray-600" />
          </IconButton>
        </div>
      </td>
    </tr>
  );
};

export default TrackingCoinRow;
