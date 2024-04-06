import { IconButton, Typography } from "@material-tailwind/react";
import { enqueueSnackbar } from "notistack";
import { TrashIcon, PencilIcon, CloudArrowDownIcon } from "@heroicons/react/24/solid";
import { fThousandSeparator, prefixValue, roundNumber } from "@/utils/helpers";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import { useState } from "react";
import { useDeleteTrackingCoinMutation, useUpdateTrackingCoinMutation } from "@/app/api/apiSlice";
import Loader from "@/components/Loader";
import { STATUS_COIN } from "@/utils/constants";
import { MutateCoinDialog } from "@/components/dialogs/MutateCoinDialog";

type TrackingCoinRowProps = {
  data: {
    id: string;
    digitalAsset: string;
    detail: string;
    img?: string | null;
    quantity: number;
    price: number;
    currentPrice?: number;
    closedPrice?: number;
    status: number;
  };
  classes: string;
};

const TrackingCoinRow = ({ data, classes }: TrackingCoinRowProps) => {
  const [isConfirmDelDial, setConfirmDelDial] = useState(false);
  const [isConfirmSoldDial, setConfirmSoldDial] = useState(false);
  const [isUpdateDial, setUpdateDial] = useState(false);
  const [deleteCoin, {isLoading: isDeleting}] = useDeleteTrackingCoinMutation()
  const [updateCoin, {isLoading: isUpdating}] = useUpdateTrackingCoinMutation()

  const isLoading = isDeleting || isUpdating;

  const {id, digitalAsset, detail, img, quantity, price, status,  closedPrice = 0,currentPrice = 0} = data;

  const priceCalc = status === STATUS_COIN.sold ? closedPrice : currentPrice;
  
  const differ = priceCalc - price;
  const isIncrease = differ >= 0;

  const amountOldPrice = prefixValue(
    fThousandSeparator(roundNumber(priceCalc * quantity)),
  );
  const amountDiffPrice = prefixValue(
    fThousandSeparator(Math.abs(roundNumber(differ * quantity))),
  );

  const handleOpenConfirmDelDial = () => setConfirmDelDial(true)

  const handleCloseConfirmDelDial = () => setConfirmDelDial(false)

  const handleSubmitDelete = async () => {
    try {
      await deleteCoin(id);
      handleCloseConfirmDelDial()
      enqueueSnackbar("Delete coin successfully", {
        variant: "success",
        anchorOrigin: {horizontal: 'center', vertical: 'top'}
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Delete coin failed!", {
        variant: "error",
        anchorOrigin: {horizontal: 'center', vertical: 'top'}
      });
    }
  }
  
  const handleOpenConfirmSoldDial = () => setConfirmSoldDial(true)

  const handleCloseConfirmSoldDial = () => setConfirmSoldDial(false)

  const handleSubmitSold = async () => {
    try {
      await updateCoin({
        id, 
        soldAt: new Date().toISOString(),
        status: STATUS_COIN.sold
      });
      handleCloseConfirmSoldDial()
      enqueueSnackbar("Sold coin successfully", {
        variant: "success",
        anchorOrigin: {horizontal: 'center', vertical: 'top'}
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Sold coin failed!", {
        variant: "error",
        anchorOrigin: {horizontal: 'center', vertical: 'top'}
      });
    }
  }

  const handleOpenUpdateDial = () => setUpdateDial(true)

  const handleCloseUpdateDial = () => setUpdateDial(false)

  return (
    <>
      <tr key={digitalAsset} className="hover:bg-gray-100">
        <td className={classes}>
          <div className="flex items-center gap-4 text-left">
            <img
              src={img || ""}
              alt={digitalAsset}
              className="w-10 h-10 p-1 border rounded-md "
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
            {prefixValue(fThousandSeparator(priceCalc))}
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
          <div className="flex justify-center gap-2">
            {status === STATUS_COIN.sold && (
                <>
                  <IconButton variant="text" size="sm" onClick={handleOpenConfirmDelDial}>
                    <TrashIcon className="w-5 h-5 text-red-500" />
                  </IconButton>
                  <IconButton variant="text" size="sm" onClick={handleOpenUpdateDial}>
                    <PencilIcon className="w-5 h-5 text-gray-600" />
                  </IconButton>
                  <IconButton variant="text" size="sm" onClick={handleOpenConfirmSoldDial}>
                    <CloudArrowDownIcon className="w-5 h-5 text-gray-600" />
                  </IconButton>
                </>
            )}
          </div>
        </td>
      </tr>
      {isLoading && <Loader open={isLoading} />}
      {isConfirmDelDial && <ConfirmDialog
        open={isConfirmDelDial}
        title="Delete this coin"
        body="Are you sure you want to delete this coin?"
        onClose={handleCloseConfirmDelDial}
        onSubmit={handleSubmitDelete}
      />}
      {isConfirmSoldDial && <ConfirmDialog
        open={isConfirmSoldDial}
        title="Sold this coin"
        body="Are you sure you want to sold this coin?"
        type="submit"
        onClose={handleCloseConfirmSoldDial}
        onSubmit={handleSubmitSold}
      />}
      {isUpdateDial && <MutateCoinDialog open={isUpdateDial}
        defaultData={data}
        onClose={handleCloseUpdateDial}
      />}
    </>
  );
};

export default TrackingCoinRow;
