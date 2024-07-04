import React, { memo, useEffect, useRef } from 'react'
import './HeroBanner.scss'

const HeroBanner: React.FC = memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fallbackImageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    const fallbackImage: any = fallbackImageRef.current

    if (!videoElement) return // Handle potential null reference

    const handlePlay = async () => {
      try {
        await videoElement.play()
      } catch (error: any) {
        if (error.name === 'NotAllowedError') {
          console.log('Low Power Mode Active')
          videoElement.remove()
          fallbackImage.style.display = 'block'
        } else {
          console.error('Video playback error:', error)
        }
      }
    }

    handlePlay()

    return () => {
      if (videoElement) {
        videoElement.pause()
      }
    }
  }, [])

  return (
    <section className='home__container_banner'>
      <div className='home__container_banner_euro_mobile'>
        <img src='/image/euro_2024.webp' alt='OEG IMAGE' />
      </div>
      <div className='home__container_banner_slide'>
        <img
          id='start_frame'
          src='/image/hero_banner_under.webp'
          alt='OEG IMAGE'
          style={{ position: 'absolute', top: '4px', left: 0, width: '100%', height: '100%', zIndex: 2 }}
        />

        <video ref={videoRef} id='hero-video' autoPlay loop muted playsInline controls={false}>
          <source src='/video/hero_motion_safiri.mp4' type='video/mp4; codecs="hvc1"' />
          <source src='/video/hero_motion_chrome.webm' type='video/webm' />
        </video>

        {/* <img
          className='home__container_default_images'
          ref={fallbackImageRef}
          id='hero-video-fallback'
          style={{ display: 'none' }}
          src='/image/hero_banner_under.webp'
          alt='Fallback image for video'
        /> */}

        <img src='/image/ColorBar-Euro2024.webp' alt='OEG IMAGE' />

        <img className='home__container_banner_slide_colorbar' src='/image/mini_colorbar.webp' alt='OEG IMAGE' />
      </div>
    </section>
  )
})

export default HeroBanner
