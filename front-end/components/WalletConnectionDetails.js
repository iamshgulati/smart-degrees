import { useLayoutContext } from '@/components/LayoutContext'
import clsx from 'clsx'
import { connectToMetaMask } from './MetaMaskConnection'

const WalletConnectionDetails = () => {
  const {
    account,
    setAccount,
    connected,
    setConnected,
    setContract,
    setContractAddress,
    setNetworkId,
    setChainId,
  } = useLayoutContext()

  const connect = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(() =>
          connectToMetaMask(
            setAccount,
            setConnected,
            setContract,
            setContractAddress,
            setNetworkId,
            setChainId
          )
        )
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className={clsx('space-x-2 pb-8 pt-6 md:space-y-5', connected ? 'hidden' : 'block')}>
        <h1 className="mb-12 text-center text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:px-6 md:text-6xl md:leading-14">
          Access Denied
        </h1>
      </div>
      <button
        className={`${
          connected
            ? 'focus:shadow-outline-green bg-green-600 px-4 py-2'
            : 'focus:shadow-outline-blue bg-blue-600 px-4 py-2 hover:bg-blue-700 dark:hover:bg-blue-500'
        } inline rounded-lg border border-transparent text-sm font-medium leading-5 text-white shadow transition-colors duration-150 focus:outline-none`}
        onClick={connect}
        disabled={connected}
      >
        {connected ? `Connected To Wallet Account: ${account}` : 'Connect To MetaMask'}
      </button>
    </div>
  )
}

export default WalletConnectionDetails
