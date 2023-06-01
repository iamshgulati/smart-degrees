/* eslint-disable react/jsx-key */
import { useLayoutContext } from '@/components/LayoutContext'
import { useState } from 'react'

const DisplayUniversities = () => {
  const { contract } = useLayoutContext()
  const [universities, setUniversities] = useState([])

  async function fetchData() {
    if (window.ethereum) {
      const response = await contract.methods.getUniversities().call()
      console.log(response)
      setUniversities(response)
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
        {'Show Universities'}
      </button>
      <div className="mt-4">
        {universities.length ? (
          <table className="prose break-all">
            <thead className="font-semibold">
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {universities.map((university, index) => {
                return (
                  <tr key={index}>
                    <td>{university.name}</td>
                    <td>{university.country}</td>
                    <td>{university.universityAddress}</td>
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

export default DisplayUniversities
