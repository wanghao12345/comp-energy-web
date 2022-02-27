import React, { useState } from 'react';
import EchartsBox from '@/components/Echarts'
import { Card, Icon } from 'antd'
import { useImmer } from 'use-immer';
export default () => {
    const [options, setOptions] = useImmer({
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
    })
    setTimeout(() => {
        setOptions((p) => {
            p.title.text = "切换图表title"
        })
    }, 3000)
    return (
        <Card>
            <EchartsBox id="barChart" options={options}></EchartsBox>
        </Card>
    )
} 