import Footer from '@/components/Footer'
import { LayoutContext } from '@/components/LayoutContext'
import Link from '@/components/Link'
import MobileNav from '@/components/MobileNav'
import SectionContainer from '@/components/SectionContainer'
import ThemeSwitch from '@/components/ThemeSwitch'
import WalletIndicator from '@/components/WalletIndicator'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import MetaMaskConnection from './MetaMaskConnection'
import WalletConnectionDetails from './WalletConnectionDetails'

const LayoutWrapper = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [connected, setConnected] = useState(false)
  const [contract, setContract] = useState(null)
  const [contractAddress, setContractAddress] = useState('')
  const [networkId, setNetworkId] = useState('')
  const [chainId, setChainId] = useState('')

  return (
    <LayoutContext.Provider
      value={{
        account,
        setAccount,
        connected,
        setConnected,
        contract,
        setContract,
        contractAddress,
        setContractAddress,
        networkId,
        setNetworkId,
        chainId,
        setChainId,
      }}
    >
      <SectionContainer>
        <div className="flex h-screen flex-col justify-between">
          <header className="flex items-center justify-between py-10">
            <div>
              <Link href="/" aria-label={siteMetadata.headerTitle}>
                <div className="flex items-center justify-between">
                  <div className="mr-3">
                    <Logo />
                  </div>
                  {typeof siteMetadata.headerTitle === 'string' ? (
                    <div className="hidden h-6 text-2xl font-semibold sm:block">
                      {siteMetadata.headerTitle}
                    </div>
                  ) : (
                    siteMetadata.headerTitle
                  )}
                </div>
              </Link>
            </div>
            <div className="flex items-center text-base leading-5">
              <div className="hidden sm:block">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <MetaMaskConnection />
              <WalletIndicator />
              <ThemeSwitch />
              <MobileNav />
            </div>
          </header>
          <main className="mb-auto">
            {connected ? <div>{children}</div> : <WalletConnectionDetails />}
          </main>
          <Footer />
        </div>
      </SectionContainer>
    </LayoutContext.Provider>
  )
}

export default LayoutWrapper
