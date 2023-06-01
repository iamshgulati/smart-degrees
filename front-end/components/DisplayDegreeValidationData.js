import { format } from 'date-fns'
import { useRef, useState } from 'react'
import { useLayoutContext } from './LayoutContext'

const DisplayDegreeValidationData = () => {
  const { contract } = useLayoutContext()
  const degreeIdEl = useRef(null)
  const [validationData, setValidationData] = useState([])

  const fetchData = async (e) => {
    e.preventDefault()
    if (window.ethereum) {
      const response = await contract.methods.validateDegree(degreeIdEl.current.value).call()
      console.log(response)
      setValidationData(response)
    }
  }

  const reset = async (e) => {
    e.preventDefault()
    degreeIdEl.current.value = ''
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="pb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Validate Degree
      </div>
      <form
        className="flex w-full flex-col items-center justify-center gap-4 md:w-1/2"
        onSubmit={fetchData}
      >
        <div className="w-full">
          <label className="sr-only" htmlFor="degree-id-input">
            Degree Id
          </label>
          <input
            autoComplete="off"
            className="w-full rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
            id="degree-id-input"
            name="degree-id"
            placeholder={'Enter degree id'}
            ref={degreeIdEl}
            required
            type="text"
          />
        </div>
        <div className="flex w-1/2 flex-col gap-1 md:flex-row md:gap-4">
          <div className="mt-2 flex w-full rounded-md shadow-sm sm:mt-0">
            <button
              className={
                'w-full rounded-md bg-primary-500 px-4 py-2 font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400'
              }
              type="submit"
            >
              {'Submit'}
            </button>
          </div>
          <div className="mt-2 flex w-full rounded-md shadow-sm sm:mt-0">
            <button
              className={`focus:ring-grey-600 w-full rounded-md bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-gray-400`}
              type="reset"
              onClick={reset}
            >
              {'Reset'}
            </button>
          </div>
        </div>
      </form>
      <div className="mt-12">
        <div className="flex flex-col">
          <div className="mt-4">
            {validationData.length ? (
              <table className="prose break-all">
                <thead className="font-semibold">
                  <tr>
                    <td>Name</td>
                    <td>Address</td>
                    <td>University</td>
                    <td>Country</td>
                    <td>Program ID</td>
                    <td>Issued On</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {validationData.firstName} {validationData.lastName}
                    </td>
                    <td>{validationData.studentAddress}</td>
                    <td>{validationData.university}</td>
                    <td>{validationData.country}</td>
                    <td>{validationData.programId}</td>
                    <td>
                      {format(new Date(0).setUTCSeconds(validationData.issuedAt), 'MMM dd, yyyy')}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayDegreeValidationData
