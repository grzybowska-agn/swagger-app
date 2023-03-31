import { useEffect, useState } from 'react'
import { getSwaggerData } from './api-service'
import InfoBlock from './components/info-block/InfoBlock'
import { SwaggerData } from './types'

function App() {
  const [data, setData] = useState<SwaggerData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true)

      try {
        const fetchedData = await getSwaggerData()
        setData(fetchedData)
      } catch (error) {
        setError(true)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    //TODO: Consider using AbortController to cancel fetch api call before unmounting
  }, [])

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Something went wrong...</div>}
      {data && (
          <InfoBlock
            title={data.info.title}
            description={data.info.description}
            version={data.info.version}
            license={data.info.license.name}
          />
      )}
    </div>
  )
}

export default App
