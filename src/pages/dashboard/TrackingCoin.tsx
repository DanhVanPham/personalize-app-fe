import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Spinner,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import {PlusIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { TABLE_HEAD } from "./constants";
import TrackingCoinRow from "./TrackingCoinRow";
import { MutateCoinDialog } from "@/components/dialogs/MutateCoinDialog";
import { STATUS_COIN, STATUS_OPTIONS } from "@/utils/constants";
import { isEmpty } from "lodash";
import { useGetTrackingCoinsQuery } from "@/app/api/apiSlice";
import { useMemo, useState } from "react";
import Summary from "./Summary";

export function TrackingCoin() {
  const [status, setStatus] = useState(String(STATUS_COIN.created));
  const { isFetching, data, refetch} = useGetTrackingCoinsQuery({status: status});
  const [isAddDial, setIsAddDial] = useState(false);

  const handleOpenAddDial = () => setIsAddDial(true)

  const handleCloseAddDial = () => setIsAddDial(false)

  const convertHead = useMemo(() => {
    if(Number(status) !== STATUS_COIN.sold) return TABLE_HEAD;
    return TABLE_HEAD.map(item => {
      if(item.head === 'Market Price') item.head = 'Closed Price'
      return item;
    })
  }, [status]);

  const renderContent = () => {
    const colSpan = TABLE_HEAD.length;
    if (isFetching)
      return (
        <tr>
          <td colSpan={colSpan} className="h-40">
            <div className="flex items-center justify-center">
            <Spinner className="w-8 h-8" />
            </div>
          </td>
        </tr>
      );

    if (!data || isEmpty(data))
      return (
        <tr>
          <td colSpan={colSpan} className="h-40">
          <div className="flex items-center justify-center">
          No data
            </div>
           
          </td>
        </tr>
      );

    return <>
    {data.map((item: any, index: number) => {
      const isLast = index === data?.length - 1;
      const classes = isLast ? "!p-4" : "!p-4 border-b border-gray-300";
      return <TrackingCoinRow key={index} data={item} classes={classes} />;
    })}
    <Summary data={data} />
    </>;
  };

  return (
    <>
    <div className="flex flex-col gap-12 mt-12 mb-8">
      <Card>
        <CardHeader variant="gradient" color="gray" className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <Typography variant="h6" color="white">
              Tracking Revenue Table
            </Typography>
            <div className="flex items-center gap-2">
              <Button
                variant="filled"
                color="white"
                size="md"
                className="flex items-center gap-0.5"
                onClick={handleOpenAddDial}
              >
                <PlusIcon className="w-5 h-5" />
                Add Crypto
              </Button>
              <IconButton variant="text" color="white" size="md" onClick={refetch}>
                <ArrowPathIcon className="w-5 h-5 text-white" />
              </IconButton>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2 overflow-x-scroll">
        <div className="w-full py-1 ml-4 max-w-10">
          <Select label="Select Status"
            value={String(status)}
            onChange={(val) => setStatus(String(val))}
          >
            {STATUS_OPTIONS.map(option => (
              <Option key={option.value} value={String(option.value)}>{option.label}</Option>
            ))}
          </Select>
        </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {convertHead.map(({ head, customeStyle }) => (
                  <th
                    key={head}
                    className={`border-b border-blue-gray-50 px-5 py-3 text-left ${customeStyle}`}
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{renderContent()}</tbody>
          </table>
        </CardBody>
      </Card>
    </div>
    {isAddDial && <MutateCoinDialog open={isAddDial} onClose={handleCloseAddDial} />}
    </>
  );
}

export default TrackingCoin;
