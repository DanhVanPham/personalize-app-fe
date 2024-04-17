import { useEffect, useMemo } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { enqueueSnackbar } from "notistack";
import { FormProvider } from "../hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { TrackingCoinForm } from "@/utils/types.server";
import { MutateCoinSchema } from "@/utils/validations/MutateCoinSchema";
import Loader from "../Loader";
import {
  useCreateTrackingCoinMutation,
  useUpdateTrackingCoinMutation,
} from "@/app/api/apiSlice";
import { MARKET_TYPE } from "@/utils/constants";
import MutateCoinContent from "./MutateCoinContent";

type Props = {
  isDuplicate?: boolean;
  open: boolean;
  defaultData?: any;
  onClose: () => void;
};

export function MutateCoinDialog({ open, defaultData, onClose }: Props) {
  const [createTrackingCoin, { isLoading: isCreating }] =
    useCreateTrackingCoinMutation();
  const [updateTrackingCoin, { isLoading: isUpdating }] =
    useUpdateTrackingCoinMutation();

  const defaultValues: TrackingCoinForm = useMemo(
    () => ({
      digitalAsset: defaultData?.digitalAsset || "",
      detail: defaultData?.detail || "",
      market: defaultData?.market || MARKET_TYPE.binance,
      img: defaultData?.img || "",
      quantity: defaultData?.quantity || 0,
      price: defaultData?.price || 0,
    }),
    [defaultData],
  );

  const isEditMode = defaultData?.id;
  const isLoading = isCreating || isUpdating;

  const methods = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(MutateCoinSchema),
  });

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues]);

  async function handleAdd(data: TrackingCoinForm) {
    try {
      await createTrackingCoin({
        digitalAsset: data?.digitalAsset,
        detail: data?.detail,
        price: data.price,
        quantity: data.quantity,
        img: data.img,
        market: data.market,
      });
      onClose();
      enqueueSnackbar("Add coin successfully", {
        variant: "success",
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Add coin failed!", {
        variant: "error",
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
    }
  }

  async function handleUpdate(id: string, data: TrackingCoinForm) {
    try {
      await updateTrackingCoin({
        id,
        digitalAsset: data?.digitalAsset,
        detail: data?.detail,
        price: data.price,
        quantity: data.quantity,
        img: data.img,
        market: data.market,
      });
      onClose();
      enqueueSnackbar("Update coin successfully", {
        variant: "success",
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Update coin failed!", {
        variant: "error",
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
    }
  }

  async function handleSubmit(data: TrackingCoinForm) {
    if (isEditMode) handleUpdate(defaultData.id, data);
    else handleAdd(data);
  }

  return (
    <>
      <Loader open={isLoading} />
      <Dialog
        size={"md"}
        className="m-auto max-h-[calc(100vh_-_1rem)] w-screen overflow-auto"
        open={open}
        handler={onClose}
      >
        <FormProvider
          id="sign-in-form"
          methods={methods}
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          <Card className="m-auto">
            <CardBody className="flex flex-col gap-2.5">
              <Typography variant="h4" color="blue-gray">
                {isEditMode ? "Update Crypto" : "Add Crypto"}
              </Typography>
              <div className="h-[100] overflow-auto">
                <MutateCoinContent />
              </div>
            </CardBody>
            <CardFooter className="flex flex-row-reverse gap-2 pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                {isEditMode ? "Update" : "Create"}
              </Button>
              <Button variant="outlined" fullWidth onClick={onClose}>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </FormProvider>
      </Dialog>
    </>
  );
}
