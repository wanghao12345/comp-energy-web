import React, { useEffect } from 'react';
import { Card, Icon } from 'antd'
import * as echarts from 'echarts';
import { globalResize, deleteGlobalResize } from '@/utils/util'
const defaultOptions = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
}
const EchartsBox = (props) => {
  const { id = 'chart-box', options = defaultOptions } = props
  useEffect(() => {
    var myChart = echarts.init(document.getElementById(id))
    myChart.setOption(options, [])
    globalResize({
      id: id,
      callback: () => {
        myChart.resize()
      }
    })
    return () => {
      deleteGlobalResize(id)
    }
  }, [options])
  return (
    <div style={{ height: '500px' }} id={id}></div>
  )
}
export default EchartsBox 