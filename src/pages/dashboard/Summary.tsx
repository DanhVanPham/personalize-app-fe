import { STATUS_COIN } from '@/utils/constants';
import { fThousandSeparator, prefixValue, roundNumber } from '@/utils/helpers';
import { Typography } from '@material-tailwind/react'

const Summary = ({data}: {data : any}) => {

    const amountOldPrice = data?.reduce((result: number, coin: any) => {
        const { status, quantity = 0, closedPrice = 0, currentPrice = 0} = coin ?? {}
        const priceCalc = Number(status) === STATUS_COIN.sold ? closedPrice : currentPrice;

        result += (quantity * priceCalc);
        return result;
    },0)

    const amountDiffPrice = data?.reduce((result: number, coin: any) => {
        const { status, price =0, quantity = 0, closedPrice = 0, currentPrice = 0} = coin ?? {}
        const priceCalc = Number(status) === STATUS_COIN.sold ? closedPrice : currentPrice;
        const differ = priceCalc - price;

        result += (quantity * differ);
        return result;
    },0)

    const isIncrease = amountDiffPrice >= 0

    const transfAmountOldPrice = prefixValue(
        fThousandSeparator(roundNumber(amountOldPrice)))

    const transfAmountDiffPrice = prefixValue(fThousandSeparator(roundNumber(amountDiffPrice)))

  return (
    <tr>
        <td  colSpan={5} className={'!p-4 text-right'}>
            Summary Revenue
        </td>
        <td className='!p-4'>
            <div className="flex flex-col items-end justify-center gap-1">
                <Typography
                variant="small"
                color={isIncrease ? "green" : "red"}
                className="text-right text-xs !font-bold"
                >
                {`${isIncrease ? "+" : "-"}${transfAmountDiffPrice}`}
                </Typography>
                <Typography
                variant="small"
                className="text-right !font-normal text-gray-600"
                >
                {transfAmountOldPrice}
                </Typography>
            </div>
        </td>
        <td/>
  </tr>
  )
}

export default Summary