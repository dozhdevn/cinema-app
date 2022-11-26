import { SERVER_URL } from './constants'
import axios from './interceptors'

export class MediaService {
  static uploadFile = async (uri: string, folder: string) => {
    const localUri = uri
    const filename = localUri.split('/').pop() || ''

    const match = /\.(\w+)$/.exec(filename)
    const type = match ? `image/${match[1]}` : `image`

    const formData = new FormData()
    formData.append('file', {
      uri: localUri,
      name: filename,
      type,
    } as unknown as Blob)

    const { data } = await axios.post(`${SERVER_URL}/files`, formData, {
      params: {
        folder,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  }
}
