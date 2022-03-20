export const flowOptions = {
  title: {
    text: '能源流向图',
    left: 'center',
    textStyle: {
      fontSize: 18,
      color: '#6b79a6',
    },
  },
  // backgroundColor: '#FFFFFF',
  series: {
    type: 'sankey',
    left: 50.0,
    top: 20.0,
    right: 150.0,
    bottom: 25.0,
    data: [
      {
        name: '总厂',
        // itemStyle: {
        //   color: '#ef85a1'
        // }
      },
      {
        name: '砂滤池',
        // itemStyle: {
        //   color: '#e18d59'
        // }
      },
      {
        name: '一期水房',
        // itemStyle: {
        //   color: '#f6c260'
        // }
      },
      {
        name: '二期水房',
        // itemStyle: {
        //   color: '#53aaf2'
        // }
      },
      {
        name: '净水池',
        // itemStyle: {
        //   color: '#5077f6'
        // }
      },
    ],
    links: [
      {
        source: '总厂',
        target: '砂滤池',
        value: 800,
      },
      {
        source: '总厂',
        target: '净水池',
        value: 200,
      },
      {
        source: '砂滤池',
        target: '一期水房',
        value: 300,
      },
      {
        source: '砂滤池',
        target: '二期水房',
        value: 200,
      },
    ],
    // lineStyle: {
    //   color: 'source',
    //   curveness: 0.5
    // },
    // itemStyle: {
    //   color: '#1f77b4',
    //   borderColor: '#1f77b4'
    // },
    label: {
      color: '#fff',
      fontFamily: 'Arial',
      fontSize: 10,
    },
  },
  tooltip: {
    trigger: 'item',
  },
};
