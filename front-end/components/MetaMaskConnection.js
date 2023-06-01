import contractArtifact from '@/components/../lib/SmartDegree.json'
import { useLayoutContext } from '@/components/LayoutContext'
import { useEffect } from 'react'
import Web3 from 'web3'

const targetNetworkId = 5777

const getNetworkId = async () => {
  const web3 = new Web3(window.ethereum)
  const currentChainId = await web3.eth.net.getId()
  return currentChainId
}

const swichNetwork = async (chainId) => {
  const currentChainId = await getNetworkId()
  if (currentChainId !== chainId) {
    try {
      const web3 = new Web3(window.ethereum)
      await web3.currentProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Web3.utils.toHex(chainId) }],
      })
    } catch (switchError) {
      if (switchError.code === 4902) {
        alert(`NetworkId ${targetNetworkId} has not been added to MetaMask`)
      }
    }
  }
}

export const connectToMetaMask = async (
  setAccount,
  setConnected,
  setContract,
  setContractAddress,
  setNetworkId,
  setChainId
) => {
  if (window.ethereum) {
    swichNetwork(targetNetworkId)

    window.ethereum
      .request({ method: 'eth_chainId' })
      .then((chainId) => {
        setNetworkId(targetNetworkId)
        setChainId(Web3.utils.toNumber(chainId))
        const contractAbi = contractArtifact.abi
        const contractAddress = contractArtifact.networks[targetNetworkId].address
        const web3 = new Web3(Web3.givenProvider)
        setContract(new web3.eth.Contract(contractAbi, contractAddress))
        setContractAddress(contractAddress)
      })
      .catch((err) => {
        console.log(err)
      })

    window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => {
        if (accounts?.length > 0) {
          setAccount(accounts[0])
          setConnected(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    window.ethereum.on('accountsChanged', function (accounts) {
      setAccount(accounts.length ? accounts[0] : null)
      setConnected(accounts.length ? true : false)
    })

    window.ethereum.on('chainChanged', function (networkId) {
      const contractAbi = contractArtifact.abi
      const contractAddress = contractArtifact.networks[networkId].address
      const web3 = new Web3(Web3.givenProvider)
      setContract(new web3.eth.Contract(contractAbi, contractAddress))
      setContractAddress(contractAddress)
    })
  }
}

const MetaMaskConnection = () => {
  const { setAccount, setConnected, setContract, setContractAddress, setNetworkId, setChainId } =
    useLayoutContext()

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then(() =>
          connectToMetaMask(
            setAccount,
            setConnected,
            setContract,
            setContractAddress,
            setNetworkId,
            setChainId
          )
        )
        .catch((err) => {
          console.log(err)
        })
    }
  }, [setAccount, setConnected, setContract, setContractAddress, setNetworkId, setChainId])

  return null
}

export default MetaMaskConnection
