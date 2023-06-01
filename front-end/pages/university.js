import DegreeIssuanceForm from '@/components/DegreeIssuanceForm'
import DisplayPrograms from '@/components/DisplayPrograms'
import DisplayStudentsForUniversity from '@/components/DisplayStudentsForUniversity'
import ProgramRegistrationForm from '@/components/ProgramRegistrationForm'
import { PageSEO } from '@/components/SEO'
import StudentAcceptanceForm from '@/components/StudentAcceptanceForm'
import WalletConnectionDetails from '@/components/WalletConnectionDetails'
import siteMetadata from '@/data/siteMetadata'

export default function UniversityPage() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="mb-12 text-center text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:px-6 md:text-8xl md:leading-14">
          University
        </h1>
      </div>
      <div className="mb-12">
        <WalletConnectionDetails />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-14">
        <ProgramRegistrationForm />
        <StudentAcceptanceForm />
        <DegreeIssuanceForm />
        <DisplayPrograms />
        <DisplayStudentsForUniversity />
      </div>
    </>
  )
}
