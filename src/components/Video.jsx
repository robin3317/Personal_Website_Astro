import {useEffect, useState} from 'react'

const Video = ({ytApiKey, ytChannelId}) => {
  const [videos, setVideos] = useState()

  useEffect(() => {
    let sessionVideos = sessionStorage.getItem('devrobin')
    if (sessionVideos) {
      sessionVideos = JSON.parse(sessionVideos)
    }

    const fetchLatestVideos = async () => {
      console.log('---inside fetchLatestVideos function---')
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtubee/v3/search?part=id&channelId=${ytChannelId}&maxResults=4&order=date&type=video&key=${ytApiKey}`
        )
        const data = await response.json()
        sessionStorage.setItem('devrobin', JSON.stringify(data))
        setVideos(data)
      } catch (err) {
        sessionStorage.setItem('devrobin', JSON.stringify(err))
      }
    }

    if (sessionVideos && sessionVideos.items) {
      setVideos(sessionVideos)
    } else {
      fetchLatestVideos()
    }
  }, [])

  return (
    <div
      className='max-w-[85rem] px-4 pt-32 sm:px-20 lg:px-40 mx-auto'
      id='video'
    >
      <h1
        className={`mb-12 font-bold text-3xl ${
          !videos?.items && 'text-center'
        }`}
      >
        04. Some latest videos from my YoutTube channel
      </h1>

      {!!videos?.items ? (
        <div className='grid lg:grid-cols-2 lg:gap-y-16 gap-10'>
          {videos.items?.map((video) => (
            <div
              className='shadow-xl shadow-gray-200 rounded-xl p-4'
              key={video.id.videoId}
            >
              <div className='aspect-w-16 aspect-h-9'>
                <iframe
                  src={`https://youtube.com/embed/${video.id.videoId}`}
                  allowFullScreen
                  className='w-full h-full'
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex justify-center'>
          <p className='text-center max-w-lg text-gray-500'>
            I'm using google free api quota, if you see this message that's mean
            - The api request cannot be completed because of exceeding quota
            limit! Or may be something wrong is happened. Sorry for this
            inconvinience! But the good news is - you can checkout my channel
            <a
              type='button'
              class='py-3 px-5 mt-5 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-900 font-semibold text-gray-800 hover:text-white hover:bg-gray-800 hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm'
              target='_blank'
              href='https://youtube.com/@codeonces'
            >
              Checkout my channel!
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

export default Video
