import React from 'react'
import Nav from '../../components/TurfAdmin/Nav'
import UploadImages from '../../components/TurfAdmin/UploadImages'

const UploadIMG = () => {
  const url = 'imgUpload'
  const endpoint = 'uploadDoc'
  const heading = 'Upload your turf Images'
  const button = 'Upload Images'
  const bg='#7fde65'

  return (
    <div className='bg-white'>
      <Nav/>  
      <UploadImages url={url} endpoint={endpoint} heading={heading} button={button} bg={bg} />
    </div>
  )
}

export default UploadIMG