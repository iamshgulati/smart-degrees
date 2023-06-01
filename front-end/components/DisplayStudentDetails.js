import { useLayoutContext } from '@/components/LayoutContext'
import { useState } from 'react'

const DisplayStudentDetails = () => {
  const { account, contract } = useLayoutContext()
  const [student, setStudent] = useState(null)

  async function fetchData() {
    if (window.ethereum) {
      const response = await contract.methods.getStudent(account).call()
      console.log(response)
      setStudent(response)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <button
        className={
          'focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500'
        }
        type="button"
        onClick={fetchData}
      >
        {'Show Student Details'}
      </button>
      <div className="mt-4">
        {student ? (
          <table className="prose break-all">
            <thead className="font-semibold">
              <tr>
                <td>Name</td>
                <td>Address</td>
                <td>Program ID</td>
                <td>Status</td>
                <td>University</td>
                <td>Program</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {student.firstName} {student.lastName}
                </td>
                <td>{student.studentAddress}</td>
                <td>{student.programId}</td>
                <td>{student.isEnrolled ? 'Enrolled' : null}</td>
                <td>{student.universityAddress}</td>
                <td>{student.programId}</td>
              </tr>
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  )
}

export default DisplayStudentDetails
