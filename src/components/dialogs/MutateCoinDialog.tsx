import { useEffect, useMemo } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { enqueueSnackbar } from "notistack";
import { FormProvider, RHFTextField } from "../hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { TrackingCoinForm } from "@/utils/types.server";
import { MutateCoinSchema } from "@/utils/validations/MutateCoinSchema";
import Loader from "../Loader";
import { useCreateTrackingCoinMutation, useUpdateTrackingCoinMutation } from "@/app/api/apiSlice";
import { MARKET_OPTIONS, MARKET_TYPE } from "@/utils/constants";

type Props = {
  open: boolean;
  defaultData?: any;
  onClose: () => void;
}


export function MutateCoinDialog({open, defaultData, onClose}: Props) {
  const [createTrackingCoin, {isLoading: isCreating }] = useCreateTrackingCoinMutation()
  const [updateTrackingCoin, {isLoading: isUpdating }] = useUpdateTrackingCoinMutation()

  const defaultValues: TrackingCoinForm = useMemo(() => ({
    digitalAsset: defaultData?.digitalAsset || "",
    detail: defaultData?.detail ||"",
    market: defaultData?.market || MARKET_TYPE.binance,
    img: defaultData?.img || "",
    quantity: defaultData?.quantity || 0,
    price: defaultData?.price || 0,
  }), [defaultData]);

  const isEditMode = defaultData?.id;
  const isLoading = isCreating || isUpdating;

  const methods = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(MutateCoinSchema),
  });

  useEffect(() => {
    methods.reset(defaultValues)
  }, [defaultValues])

  const imageUrl = methods.watch("img");

  const marketWatch = methods.watch('market');

  const handleChange= (key: any, value: any) => {
    methods.setValue(key, value)
  }

  async function handleAdd(data: TrackingCoinForm) {
    try {
      await createTrackingCoin({
        digitalAsset: data?.digitalAsset,
        detail: data?.detail,
        price: data.price,
        quantity: data.quantity,
        img: data.img,
        market: data.market
      });
      onClose()
      enqueueSnackbar("Add coin successfully", {
        variant: "success",
        anchorOrigin: {horizontal: 'center', vertical: 'top'}
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Add coin failed!", {
        variant: "error",
        anchorOrigin: {horizontal: 'center', vertical: 'top'}
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
        market: data.market
      });
      onClose()
      enqueueSnackbar("Update coin successfully", {
        variant: "success",
        anchorOrigin: {horizontal: 'center', vertical: 'top'}
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Update coin failed!", {
        variant: "error",
        anchorOrigin: {horizontal: 'center', vertical: 'top'}
      });
    } 
  }

  async function handleSubmit(data: TrackingCoinForm) {
   if(isEditMode) handleUpdate(defaultData.id, data);
   else handleAdd(data);
  }

  return (
    <>
      <Loader open={isLoading} />
      <Dialog
        size="lg"
        open={open}
        handler={onClose}
        className="bg-transparent shadow-none"
      >
        <FormProvider
          id="sign-in-form"
          methods={methods}
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="max-w-screen-lg mx-auto mt-8 mb-2 w-80 lg:w-1/2"
        >
          <Card className="w-full mx-auto">
            <CardBody className="flex flex-col gap-2.5">
              <Typography variant="h4" color="blue-gray">
                Add Crypto
              </Typography>
              <div className="flex flex-col gap-2 mb-1">
                <Typography className="-mb-2" variant="h6">
                  Digital Asset
                </Typography>
                  <RHFTextField
                    name="digitalAsset"
                    size="lg"
                    placeholder="BTCUSDT"
                    className="  focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                <Typography className="-mb-2"  variant="h6">
                  Market
                </Typography>
                <Select
                  value={marketWatch}
                  onChange={(value) => handleChange('market', value)}
                >
                  {MARKET_OPTIONS.map(market => (
                    <Option key={market.id} value={market.value}>{market.label}</Option>
                  ))}
                </Select>
                <Typography className="-mb-2" variant="h6">
                  Detail
                </Typography>
                <RHFTextField
                  name="detail"
                  size="lg"
                  placeholder="Bitcoin/USDT"
                  className="  focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography className="-mb-2" variant="h6">
                  Image
                </Typography>
                <div className="flex items-center flex-1 gap-4 text-left">
                  <RHFTextField
                    name="img"
                    size="lg"
                    placeholder="Enter url image"
                    className="  focus:!border-t-gray-900 w-full"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                    <img
                      src={imageUrl || ''}
                      alt="Image coin"
                      className="w-10 h-10 p-1 border rounded-md"
                    />
                </div>
                <Typography className="-mb-2" variant="h6">
                  Quantity
                </Typography>
                <RHFTextField
                  name="quantity"
                  size="lg"
                  type="number"
                  className="  focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography className="-mb-2" variant="h6">
                  Price
                </Typography>
                <RHFTextField
                  name="price"
                  size="lg"
                  type="number"
                  className="  focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </CardBody>
            <CardFooter className="flex flex-col gap-2 pt-0 md:flex-row-reverse">
              <Button type="submit" variant="gradient" fullWidth>
                Submit
              </Button>
              <Button variant="outlined" fullWidth onClick={() => onClose()}>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </FormProvider>
      </Dialog>
    </>
  );
}
