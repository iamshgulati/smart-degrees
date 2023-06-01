import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function HomePage() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-center text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:px-6 md:text-5xl md:leading-14">
          Smart Degrees dApp
        </h1>
      </div>
      <div className="flex flex-col items-start gap-4 text-base md:mt-16">
        <h2 className="mb-4 text-xl font-bold">Main Functions of dApp</h2>
        <ul className="flex flex-col gap-6">
          <li>
            <p className="text-lg font-semibold">Function 1 - Register a University</p>
            <p>In this functionality, an admin will register a university.</p>
          </li>
          <li>
            <p className="text-lg font-semibold">Function 2 - Issue a Degree</p>
            <p>In this functionality, a university will issue a degree to a student.</p>
          </li>
          <li>
            <p className="text-lg font-semibold">Function 3 - Validate a Degree</p>
            <p>In this functionality, a verfier will validate the degree provided by a student.</p>
          </li>
        </ul>
      </div>
    </>
  )
}
