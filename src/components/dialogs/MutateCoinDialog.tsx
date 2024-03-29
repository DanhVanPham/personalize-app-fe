import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { enqueueSnackbar } from "notistack";
import { FormProvider, RHFTextField } from "../hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { TrackingCoinForm } from "@/utils/types.server";
import { MutateCoinSchema } from "@/utils/validations/MutateCoinSchema";
import { addCoin } from "@/utils/tracking-coin.server";
import Loader from "../Loader";

const defaultValues: TrackingCoinForm = {
  digitalAsset: "",
  detail: "",
  img: "",
  quantity: 0,
  price: 0,
};
type Props = {
  handleSuccess: () => void;
};

export function MutateCoinDialog({ handleSuccess }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const methods = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(MutateCoinSchema),
  });

  const imageUrl = methods.watch("img");

  async function handleSubmit(data: TrackingCoinForm) {
    try {
      setIsLoading(true);
      await addCoin({
        digitalAsset: data?.digitalAsset,
        detail: data?.detail,
        price: data.price,
        quantity: data.quantity,
        img: data.img,
      });
      enqueueSnackbar("Add coin successfully", {
        variant: "success",
      });
      handleSuccess();
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Add coin failed!", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Loader open={isLoading} />
      <Button
        variant="filled"
        color="white"
        size="md"
        className="flex items-center gap-0.5"
        onClick={handleOpen}
      >
        <PlusIcon className="h-5 w-5" />
        Add Crypto
      </Button>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <FormProvider
          id="sign-in-form"
          methods={methods}
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="mx-auto mb-2 mt-8 w-80 max-w-screen-lg lg:w-1/2"
        >
          <Card className="mx-auto w-full">
            <CardBody className="flex flex-col gap-2.5">
              <Typography variant="h4" color="blue-gray">
                Add Crypto
              </Typography>
              <div className="mb-1 flex flex-col gap-2">
                <Typography className="-mb-2" variant="h6">
                  Digital Asset
                </Typography>
                <RHFTextField
                  name="digitalAsset"
                  size="lg"
                  placeholder="BTCUSDT"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography className="-mb-2" variant="h6">
                  Detail
                </Typography>
                <RHFTextField
                  name="detail"
                  size="lg"
                  placeholder="Bitcoin/USDT"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography className="-mb-2" variant="h6">
                  Image
                </Typography>
                <div className="flex items-center gap-4 text-left">
                  <RHFTextField
                    name="img"
                    size="lg"
                    placeholder="Enter url image"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Image coin"
                      className="h-10 w-10 rounded-md border p-1"
                    />
                  )}
                </div>
                <Typography className="-mb-2" variant="h6">
                  Quantity
                </Typography>
                <RHFTextField
                  name="quantity"
                  size="lg"
                  type="number"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </CardBody>
            <CardFooter className="flex flex-col gap-2 pt-0 md:flex-row">
              <Button type="submit" variant="gradient" fullWidth>
                Submit
              </Button>
              <Button variant="outlined" fullWidth onClick={() => handleOpen()}>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </FormProvider>
      </Dialog>
    </>
  );
}
