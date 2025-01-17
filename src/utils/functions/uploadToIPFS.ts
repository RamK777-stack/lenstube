import { IPFS_GATEWAY } from '@utils/constants'
import axios from 'axios'
import { IPFSUploadResult } from 'src/types/local'

const uploadDataToIPFS = async (data: any): Promise<IPFSUploadResult> => {
  const formData = new FormData()
  formData.append('data', JSON.stringify(data))
  try {
    const uploaded = await axios('https://ipfs.infura.io:5001/api/v0/add', {
      method: 'POST',
      data: formData
    })
    const { Hash }: { Hash: string } = await uploaded.data
    return {
      ipfsUrl: `${IPFS_GATEWAY}/${Hash}`,
      hash: Hash,
      type: 'application/json'
    }
  } catch (error) {
    return {
      ipfsUrl: '',
      hash: '',
      type: 'application/json'
    }
  }
}

const uploadImageToIPFS = async (file: File): Promise<IPFSUploadResult> => {
  const formData = new FormData()
  formData.append('file', file, 'img')
  try {
    const uploaded = await axios('https://ipfs.infura.io:5001/api/v0/add', {
      method: 'POST',
      data: formData
    })
    const { Hash }: { Hash: string } = await uploaded.data

    return {
      ipfsUrl: `https://ipfs.infura.io/ipfs/${Hash}`,
      type: file.type || 'image/jpeg',
      hash: Hash
    }
  } catch (error) {
    return {
      ipfsUrl: '',
      hash: '',
      type: file.type
    }
  }
}

export { uploadDataToIPFS, uploadImageToIPFS }
