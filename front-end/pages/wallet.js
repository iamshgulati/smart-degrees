import NetworkDetails from '@/components/NetworkDetails'
import { PageSEO } from '@/components/SEO'
import SmartContractConnectionDetails from '@/components/SmartContractConnectionDetails'
import WalletConnectionDetails from '@/components/WalletConnectionDetails'
import siteMetadata from '@/data/siteMetadata'

export default function WalletPage() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="mb-12 text-center text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:px-6 md:text-8xl md:leading-14">
          Wallet Status
        </h1>
      </div>
      <div className="mb-8">
        <WalletConnectionDetails />
      </div>
      <div className="mb-8">
        <NetworkDetails />
      </div>
      <div className="mb-16">
        <SmartContractConnectionDetails />
      </div>
    </>
  )
}
