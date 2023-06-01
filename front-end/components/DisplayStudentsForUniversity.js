import { useState } from 'react'
import { useLayoutContext } from './LayoutContext'

const DisplayStudentsForUniversity = () => {
  const [students, setStudents] = useState([])
  const { account, contract } = useLayoutContext()

  async function fetchData() {
    if (window.ethereum) {
      const response = await contract.methods.getStudentsForUniversity(account).call()
      console.log(response)
      setStudents(response)
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
        {'Show Students'}
      </button>
      <div className="mt-4">
        {students.length ? (
          <table className="prose break-all">
            <thead className="font-semibold">
              <tr>
                <td>Name</td>
                <td>Address</td>
                <td>Program ID</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {student.firstName} {student.lastName}
                    </td>
                    <td>{student.studentAddress}</td>
                    <td>{student.programId}</td>
                    <td>{student.isEnrolled ? 'Enrolled' : 'Enrollment Pending'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  )
}

export default DisplayStudentsForUniversity
