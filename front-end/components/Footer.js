import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mb-16 mt-8 flex w-full flex-row justify-between space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <div className="text-right">
          <span>{`Copyrights © ${new Date().getFullYear()}`}</span>
          <span>{` • `}</span>
          <span>{`${siteMetadata.author1}`}</span>
          <span>{` • `}</span>
          <span>{`${siteMetadata.author2}`}</span>
        </div>
        <div className="text-left">
          <span>Submitted to Mayra Samaneigo</span>
        </div>
      </div>
    </footer>
  )
}
