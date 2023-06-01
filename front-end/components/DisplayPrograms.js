import { useState } from 'react'
import { useLayoutContext } from './LayoutContext'

const DisplayPrograms = () => {
  const [programs, setPrograms] = useState([])
  const { account, contract } = useLayoutContext()

  async function fetchData() {
    if (window.ethereum) {
      const response = await contract.methods.getProgramsForUniversity(account).call()
      console.log(response)
      setPrograms(response)
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
        {'Show Programs'}
      </button>
      <div className="mt-4">
        {programs.length ? (
          <table className="prose break-all">
            <thead className="font-semibold">
              <tr>
                <td>Title</td>
                <td>Field</td>
                <td>Program ID</td>
              </tr>
            </thead>
            <tbody>
              {programs.map((program, index) => {
                return (
                  <tr key={index}>
                    <td>{program.title}</td>
                    <td>{program.field}</td>
                    <td>{program.programId}</td>
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

export default DisplayPrograms
