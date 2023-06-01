import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import MetaMaskConnection from './MetaMaskConnection'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import WalletIndicator from './WalletIndicator'

export default function Header() {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle} passHref>
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
  )
}
