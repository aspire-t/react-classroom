import React, { PropsWithChildren, useEffect } from 'react'
import { Carousel } from 'antd'

import { Slider } from '@/typings'

import './index.less'

type Props = PropsWithChildren<{
  sliders: Slider[]
  getSliders: () => void
}>
function HomeSliders(props: Props) {
  useEffect(() => {
    if (props.sliders.length === 0) {
      let result = props.getSliders()
      console.log('HomeSliders', result)
    }
  }, [])
  return (
    <Carousel>
      {props.sliders.map((item: Slider, index: number) => (
        <div key={item.id}>
          <img src={item.url}></img>
        </div>
      ))}
    </Carousel>
  )
}
export default HomeSliders
