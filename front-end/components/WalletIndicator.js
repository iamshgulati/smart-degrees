import { useLayoutContext } from '@/components/LayoutContext'
import Link from 'next/link'
import { FaEthereum } from 'react-icons/fa'

const WalletIndicator = () => {
  const { connected } = useLayoutContext()

  return (
    <Link href="/wallet" aria-label="Ethereum Wallet Connection Indicator">
      <a>
        <FaEthereum
          size={20}
          color={`${connected ? 'green' : 'red'}`}
          className={`ml-1 mr-1 h-8 w-8 rounded p-1 sm:ml-4 ${connected ? '' : 'animate-pulse'}`}
        />
      </a>
    </Link>
  )
}

export default WalletIndicator
