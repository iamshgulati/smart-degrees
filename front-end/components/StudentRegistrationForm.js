import { useLayoutContext } from '@/components/LayoutContext'
import { useRef, useState } from 'react'

const StudentRegistrationForm = () => {
  const { account, contract, contractAddress } = useLayoutContext()

  const firstNameEl = useRef(null)
  const lastNameEl = useRef(null)
  const [txMessage, setTxMessage] = useState('')
  const [txError, setTxError] = useState('')
  const [txInitiated, setTxInitiated] = useState(false)
  const [txErrored, setTxErrored] = useState(false)
  const [txCompleted, setTxCompleted] = useState(false)

  const registerStudent = async (e) => {
    e.preventDefault()

    setTxInitiated(false)
    setTxErrored(false)
    setTxCompleted(false)
    setTxMessage('')
    setTxError('')

    console.log(`Starting transaction... Smart contract account: ${contractAddress}`)
    setTxInitiated(true)
    setTxMessage(`Starting transaction... Smart contract account: ${contractAddress}`)

    await contract.methods
      .registerStudent(firstNameEl.current.value, lastNameEl.current.value)
      .send({
        from: account,
      })
      .on('sending', (txToBeSent) => {
        console.log(`Sending transaction... ${JSON.stringify(txToBeSent)}`)
        setTxInitiated(true)
        setTxMessage(`Sending transaction...`)
      })
      .on('sent', (txSent) => {
        console.log(`Transaction sent... ${JSON.stringify(txSent)}`)
        setTxInitiated(true)
        setTxMessage(`Transaction sent...`)
      })
      .on('transactionHash', (txHash) => {
        console.log(`Transaction mined... tx: ${JSON.stringify(txHash)}`)
        setTxInitiated(true)
        setTxMessage(`Transaction mined... tx: ${JSON.stringify(txHash)}`)
      })
      .on('receipt', (txReceipt) => {
        console.log(`Transaction receipt... tx: ${JSON.stringify(txReceipt)}`)
        setTxInitiated(true)
        setTxMessage(`Transaction receipt...`)
      })
      .on('confirmation', (txConfirmation) => {
        console.log(`Transaction confirmed... tx: ${JSON.stringify(txConfirmation)}`)
        setTxInitiated(true)
        setTxMessage(`Transaction confirmed...`)
      })
      .on('error', (error) => {
        console.error(`An error happened: ${error.message}`)
        setTxErrored(true)
        setTxError(error.message)
        return
      })
      .then((res) => {
        console.log(`Transaction result... ${JSON.stringify(res)}`)
        console.log(
          `Success: The transaction is now on chain and mined in block ${res.blockNumber}`
        )
        setTxCompleted(true)
        setTxMessage(
          ` ${txMessage} The transaction is now on chain and mined in block ${res.blockNumber}. Successful! 🎉 Student registered.`
        )
      })
  }

  const reset = async (e) => {
    e.preventDefault()

    firstNameEl.current.value = ''
    lastNameEl.current.value = ''

    setTxInitiated(false)
    setTxErrored(false)
    setTxCompleted(false)
    setTxMessage('')
    setTxError('')
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="pb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Self Registration
      </div>
      <form
        className="flex w-full flex-col items-center justify-center gap-4 md:w-1/2"
        onSubmit={registerStudent}
      >
        <div className="w-full">
          <label className="sr-only" htmlFor="first-name-input">
            First Name
          </label>
          <input
            autoComplete="off"
            className="w-full rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
            id="first-name-input"
            name="first-name"
            placeholder={'Enter first name'}
            ref={firstNameEl}
            required
            type="text"
            disabled={txCompleted}
          />
        </div>
        <div className="w-full">
          <label className="sr-only" htmlFor="last-name-input">
            Last Name
          </label>
          <input
            autoComplete="off"
            className="w-full rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
            id="last-name-input"
            name="last-name"
            placeholder={'Enter last name'}
            ref={lastNameEl}
            required
            type="text"
            disabled={txCompleted}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-1 md:flex-row md:gap-4">
          <div className="mt-2 flex w-full rounded-md shadow-sm sm:mt-0">
            <button
              className={`w-full rounded-md bg-primary-500 px-4 py-2 font-medium text-white ${
                txCompleted ? 'cursor-default' : 'hover:bg-primary-700 dark:hover:bg-primary-400'
              } focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black`}
              type="submit"
              disabled={txCompleted}
            >
              {'Submit'}
            </button>
          </div>
          <div className="mt-2 flex w-full rounded-md shadow-sm sm:mt-0">
            <button
              className={`w-full rounded-md bg-gray-500 px-4 py-2 font-medium text-white ${
                txCompleted ? 'cursor-default' : 'hover:bg-gray-700 dark:hover:bg-gray-400'
              } focus:ring-grey-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black`}
              type="reset"
              onClick={reset}
            >
              {'Reset'}
            </button>
          </div>
        </div>
      </form>
      <div className="flex max-w-5xl flex-col break-all text-center">
        {(txInitiated || txCompleted) && (
          <span className="pt-4 text-sm text-green-500 dark:text-green-400">{txMessage}</span>
        )}
        {txErrored && (
          <span className="pt-4 text-sm text-red-500 dark:text-red-400">{txError}</span>
        )}
      </div>
    </div>
  )
}

export default StudentRegistrationForm
