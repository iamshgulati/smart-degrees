import { useLayoutContext } from '@/components/LayoutContext'

const NetworkDetails = () => {
  const { chainId, networkId } = useLayoutContext()
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <button
        className={`${
          networkId
            ? 'focus:shadow-outline-green bg-green-600 px-4 py-2'
            : 'focus:shadow-outline-red bg-red-600 px-4 py-2 hover:bg-red-700 dark:hover:bg-red-500'
        } inline rounded-lg border border-transparent text-sm font-medium leading-5 text-white shadow transition-colors duration-150 focus:outline-none`}
        disabled={networkId}
      >
        {networkId
          ? `Connected To Ethereum Network Id: ${networkId} Chain Id: ${chainId}`
          : `Ethereum Network Id: ${networkId}: Unavailable`}
      </button>
    </div>
  )
}

export default NetworkDetails
