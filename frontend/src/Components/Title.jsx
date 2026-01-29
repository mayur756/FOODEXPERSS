import React from 'react'

function Title({title1,title2,titlestyles,title1styles,parastyle}) {
  return (
    <div className={`${titlestyles} pb-1`}>
      <h2 className={`${titlestyles} h2`}>{title1}<span className='text-secondary !font-light'>{title2}</span></h2>
      <p className={`${parastyle} hidden`}>Our product are crafted with the finest ingrediction to  deilver excptional taste and quality</p>
    </div>
  )
}

export default Title
