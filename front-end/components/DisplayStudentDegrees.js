import { format } from 'date-fns'
import { useState } from 'react'
import { useLayoutContext } from './LayoutContext'

const DisplayStudentDegrees = () => {
  const [degrees, setDegrees] = useState([])
  const { account, contract } = useLayoutContext()

  async function fetchData() {
    if (window.ethereum) {
      const response = await contract.methods.getIssuedDegreesForStudent(account).call()
      console.log(response)
      setDegrees(response)
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
        {'Show Student Degrees'}
      </button>
      <div className="mt-4">
        {degrees.length ? (
          <table className="prose break-all">
            <thead className="font-semibold">
              <tr>
                <td>Degree Id</td>
                <td>Program ID</td>
                <td>Issued On</td>
              </tr>
            </thead>
            <tbody>
              {degrees.map((degree, index) => {
                return (
                  <tr key={index}>
                    <td>{degree.issuedDegreeId}</td>
                    <td>{degree.programId}</td>
                    <td>{format(new Date(0).setUTCSeconds(degree.issuedAt), 'MMM dd, yyyy')}</td>
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

export default DisplayStudentDegrees
