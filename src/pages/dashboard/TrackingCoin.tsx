import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/solid";
import { TABLE_HEAD } from "./constants";
import TrackingCoinRow from "./TrackingCoinRow";

const TABLE_ROW = [
  {
    img: "https://s3-alpha-sig.figma.com/img/cefe/73ce/7d0fea7e5a2826dad40e3f74685937c3?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KkXvjAC06Kh2J~MZqR2G4beePqm3DfSqDK0UlSm0a15nSz0ZtA3amo8AMwMO4rOYATySTm1bJrcQaDVY2chHsijuLyRCxqAIUx5WyvDE6y5sk0Liv6qS4MYKW2lxU~hKlCH4yoKENfayhWwgUkWywbi649ZV35VISIfiCMgnwf6JFbnK2oSOgWzymMifn-av3WrLSozPZHDGrwoNSkhH1CoGu4zuOAvNZylnMgZDswVaWSaW1Uz3sptp7j4JR3fiAWNq9F41iZ9SVz2JSZnGuNkhn54Yi4dzuF5CQr7WhWbBGq60MfF5aAT-RHmMnn8BNw1VoFrhlXI5vVHeOWwWHg__",
    digitalAsset: "BTC",
    detail: "Bitcoin",
    quantity: 148,
    price: 46727.3,
    currentPrice: 48000,
  },
  {
    img: "https://s3-alpha-sig.figma.com/img/f2ad/77e3/8e53a4a9d2f140866ce3206fd66ce400?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pb5Ibo7VdqYLRjYOsx0idPDf2nGrGz0p0pRZRa6QI3h1J1cZleKLzzf0d6fJahbV-ouQqS7dAOVtnzGa2WY2RmS493ry41iRTDpEA9saQlBVbZxICoLOUtWAzLOmIEiNpuWsxrdHHcCDTeXt5jgW69ySsuonH2iInOO7Gy8ysww713RCUnJK0rNa113IqFwl5ErzSTWpCQqhtRtXVyiLoRLzX3CJ-jSl6WerBsZzTYui4ezBw0uxKkAmzHGlmmVqN8c6O3gIURd3ucazRLsa95-8MQJ79umGoQFt9hZ-jHYkvaJxt7ZGDBAawsTNlTus4Nyn3be1mFDkiUnF4jXY8g__",
    digitalAsset: "ETH",
    detail: "Ethereum",
    quantity: 148,
    price: 46727.3,
    currentPrice: 48000,
  },
  {
    img: "https://s3-alpha-sig.figma.com/img/7c5c/edd3/93978e03cdc29e5b9d34df8e5905e4b7?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kxPF5rtPWECHJYzXZWfvsvhohU8EOswR-WiBFCWdfQhsVn4cvh2kPWJQmcugl19GiB3EeEI7VHXJoH4bxXZx7Xw8513Q-ng-maHpxzNp235XDf~xgYYz5VnIS7awTusCPQ~dlx3drZLb0~ax8zr8u7HCyRHmEmXOGR9DW6FuohzGDYTEDEfe6dNKMJi9LYphT~dlmLjvAL0i-rGHvwl-1dPwDcYa81wNjvXBs8olXUo2ShUKjUN0MC4c7cfTTdNv~hST7ZXwS8cc6bhEmXX9mVmBZW0FmVQfNCH~HyHlbSgoyL-tQfIG1DGFBTYcW8p~zSY9uH1r~-3-~jCwEU8B~Q__",
    digitalAsset: "USDT",
    detail: "TetherUS",
    quantity: 148,
    price: 46727.3,
    currentPrice: 48000,
  },
  {
    img: "https://s3-alpha-sig.figma.com/img/5e89/552f/22d03f6a4e6948f63c937b03d1d68320?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=o1FFB1t1fJGv-Q4tCVxRRsFQ5oU6BhG-rZblpHZm3tpz~2Q1oxoMC~Ihj2fopioUoxMnz84EEAj~yKsuBs7anNHP8v9ei1dnU55LDfXAO9Fqr1i7xDY6qVFdnCcf-9OP2gHLPUweXytLeWVGcBYAMQVoamHyaGMJE1A6slQpZ63izkzeqZDu2aQ4ia6x95Fx0weQCu~GGnR0axYM9HbQVbg9jNfHWv6dUJKdo6hKpi4USjE5qZjr485GJmGywHDu0ZleRO2kzJlM~7-cxT-YAwq3ReiLU27hHeqaXMdFBsLarYUJmlnP0nUNmvGr1IFXg1hjlsCtgfRBpE9Y0HICLA__",
    digitalAsset: "SOL",
    detail: "Solana",
    quantity: 148,
    price: 46727.3,
    currentPrice: 48000,
  },
  {
    img: "https://s3-alpha-sig.figma.com/img/e40b/12da/5e7a79582d0b9df30b2c997fdd071bfe?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ozUELYb64IxFAoULE5VYw0MAdKnevMQ~v6G2y7v44O3YK-mjohyraJG-CayPwPvBKFCSrPayl3W97Gbep5sxi48TWkaodmwJDtvkzs5iFiZhgfYC~q-TkJzhsIpMukZqA3jauSEPLpwRE6TlrExsyyt6XNVEcNXZZi0LRg8KnyP8cmJmpIDYroW9~gf5XOX4OPnAPwX66V5RJ2WTzBhQIVgHkhzRJ6LvyS156uS9X8wviu1hXxeowlYUzAkKhik4IIAckE30abfb9BaoENnAtMXygkZVISJF~J2nHIVLNDxjCAjyU20gWvxbI9F8vycrrEhlIx824eaLq2EniquzbQ__",
    digitalAsset: "XRP",
    detail: "Ripple",
    quantity: 148,
    price: 46727.3,
    currentPrice: 48000,
  },
];

export function TrackingCoin() {
  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
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
              >
                <PlusIcon className="h-5 w-5" />
                Add Crypto
              </Button>
              <IconButton variant="text" color="white" size="md">
                <ArrowPathIcon className="h-5 w-5 text-white" />
              </IconButton>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {TABLE_HEAD.map(({ head, customeStyle }) => (
                  <th
                    key={head}
                    className={`border-blue-gray-50 border-b px-5 py-3 text-left ${customeStyle}`}
                  >
                    <Typography
                      variant="small"
                      className="text-blue-gray-400 text-[11px] font-bold uppercase"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROW.map((data, index) => {
                const isLast = index === TABLE_ROW.length - 1;
                const classes = isLast
                  ? "!p-4"
                  : "!p-4 border-b border-gray-300";
                return (
                  <TrackingCoinRow key={index} data={data} classes={classes} />
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default TrackingCoin;
