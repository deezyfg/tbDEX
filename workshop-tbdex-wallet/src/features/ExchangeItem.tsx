import { useEffect, useState } from 'react'
import { money, removeTrailingZeros, BTC } from '../currency-utils'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'react-toastify/dist/ReactToastify.css'
import { type ClientExchange } from '../api-utils'

type ExchangeItemProps = {
  exchange: ClientExchange;
  handleStatusModalOpen: (exchange: ClientExchange) => void
}

/**
 * This component represents an individual item in a list of exchanges.
 *
 * @param {Object} props.exchange - The exchange object.
 * @param {Function} props.handleStatusModalOpen - A function to handle opening a status modal for the exchange.
 * @returns {JSX.Element} - Returns an individual exchange item component.
 */
export function ExchangeItem(props: ExchangeItemProps) {
  const [statusValue, setStatusValue] = useState(null)
  dayjs.locale('en')

  useEffect(() => {
    if (statusValue) {
      toast(getStatusString(props.exchange), {
        toastId: props.exchange.id + '_' + Date.now(),
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
    setStatusValue(props.exchange.status)
  }, [props.exchange.status])

  return (
    <>
    <li className="flex py-1">
        <button className="w-full h-full rounded-lg px-4 py-1 hover:bg-neutral-600/20 flex" onClick={() => props.handleStatusModalOpen(props.exchange)}>
          <div className="flex items-center flex-grow pr-2">
            <div className="flex justify-center items-center w-8 h-8 mt-1 rounded-full bg-indigo-600 text-white text-sm font-semibold">
              $
            </div>
            <div className="min-w-0 truncate text-left pl-3">
              <p className="truncate text-xs leading-5 text-gray-500">{getStatusString(props.exchange)}</p>
            </div>
          </div>
          { props.exchange.status === 'quote' ? (
            <>
              <div className="w-1/5 flex items-center justify-end">
                <div className="h-auto w-auto mt-1.5 p-2 rounded-lg bg-neutral-700 text-white text-xs flex items-center justify-center">Review</div>
              </div>
            </>
          ) : props.exchange.status === 'completed' || props.exchange.status === 'orderstatus' ? (
            <>
              <div className="w-1/5 text-xs font-medium leading-6 text-right pt-2 mr-1 text-gray-500">
                {removeTrailingZeros(BTC(props.exchange.payoutAmount).format())} {props.exchange.payoutCurrency}
              </div>
            </>
          ) :
            <div className="w-1/5 text-xs font-medium leading-6 text-right pt-2 mr-1 text-neutral-100"></div>
          }
        </button>
      </li>
    </>
  )
}

const getStatusString = (exchange) => {
  switch (exchange.status) {
    case 'rfq':
      return `Requested ${money(exchange.payinAmount).format()} ${exchange.payinCurrency}`
    case 'quote':
      return `Quoted ${money(exchange.payinAmount).format()} ${exchange.payinCurrency}`
    case 'order':
      return `Payment for ${money(exchange.payinAmount).format()} ${exchange.payinCurrency} submitted`
    case 'orderstatus':
      return `Payment processing for ${money(exchange.payinAmount).format()} ${exchange.payinCurrency}...`
    case 'completed':
      return `Sent ${money(exchange.payinAmount).format()} ${exchange.payinCurrency}`
    case 'expired':
      return `Quote for ${money(exchange.payinAmount).format()} ${exchange.payinCurrency} expired`
    case 'cancelled':
      return `Exchange for ${money(exchange.payinAmount).format()} ${exchange.payinCurrency} was cancelled`
    case 'failed':
      return `Payment for ${money(exchange.payinAmount).format()} ${exchange.payinCurrency} failed`
    default:
      return exchange.status
  }
}
