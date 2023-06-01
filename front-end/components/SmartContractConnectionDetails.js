import { useLayoutContext } from '@/components/LayoutContext'

const SmartContractConnectionDetails = () => {
  const { contractAddress } = useLayoutContext()
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <button
        className={`${
          contractAddress
            ? 'focus:shadow-outline-green bg-green-600 px-4 py-2'
            : 'focus:shadow-outline-red bg-red-600 px-4 py-2 hover:bg-red-700 dark:hover:bg-red-500'
        } inline rounded-lg border border-transparent text-sm font-medium leading-5 text-white shadow transition-colors duration-150 focus:outline-none`}
        disabled={contractAddress}
      >
        {contractAddress
          ? `Connected To Smart Contract Account: ${contractAddress}`
          : 'Smart Contract Address: Unavailable'}
      </button>
    </div>
  )
}

export default SmartContractConnectionDetails
