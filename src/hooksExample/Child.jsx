import React, { memo } from 'react'

function Child({name}) {
    console.log("Child render")
  return (
    <h1>{name?.length > 0 ? name : "--------"}</h1>
  )
}

export default memo(Child) 