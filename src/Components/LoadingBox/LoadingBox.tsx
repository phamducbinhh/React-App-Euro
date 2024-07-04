import React from 'react'
import './LoadingBox.scss'

interface LoadingBoxProps {
  percent: number
}

const LoadingBox: React.FC<LoadingBoxProps> = ({ percent }) => {
  return (
    <div className='loading-box' id='loading-box'>
      <div className='loading-box-content'>
        <div className='loading-box-content-logo'>
          <img src='image/oeg_logo.webp' alt='OEG LOGO' />
        </div>
        <div className='loading-box-content-progress'>
          <div className='loading-box-content-progress-bar' style={{ width: `${percent}%` }}></div>
        </div>
        <div className='loading-box-content-count'>{percent}%</div>
      </div>
    </div>
  )
}

export default LoadingBox
