import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const createLineChart = (finalData, chartRef) => {
    const { max, title, obs } = finalData;
    let obsStr = 'OBS: '
    const tensionValue = 0;
    const borderWidthValue = 1.5;
    const ctx = chartRef.current.getContext('2d');
    if(obs === '') {
        obsStr = ''
    }

    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, chartRef.current.width, chartRef.current.height);
    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, options) => {
          const {ctx} = chart;
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = options.color || '#FFFFFF';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: finalData.labels.slice(1),
        datasets: [
            {
                label: 'Acertos',
                data: finalData.dataset1,
                fill: false,
                borderColor: 'rgb(0,128,0)',
                backgroundColor: 'rgb(0,128,0)',
                tension: tensionValue,
                borderWidth: borderWidthValue
            },
            {
                label: 'Erros',
                data: finalData.dataset2,
                fill: false,
                borderColor: 'rgb(255,0,0)',
                backgroundColor: 'rgb(255,0,0)',
                tension: tensionValue,
                borderWidth: borderWidthValue
            },
            {
                label: 'Acertos com Suporte',
                data: finalData.dataset3,
                fill: false,
                borderColor: 'rgb(0, 0, 255)',
                backgroundColor: 'rgb(0, 0, 255)',
                tension: tensionValue,
                borderWidth: borderWidthValue
            },
            {
                label: 'Aplicações',
                data: finalData.total,
                fill: false,
                borderColor: 'rgb(0, 0, 0)',
                backgroundColor: 'rgb(0, 0, 0)',
                tension: tensionValue,
                borderWidth: borderWidthValue
            },
        ],
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                subtitle: {
                    display: true,
                    text: obsStr + obs,
                    position: 'bottom'
                },
                customCanvasBackgroundColor: {
                  color: 'white',
                }
              },
            scales: {
                y: {
                beginAtZero: true,
                max: max
                },
            },
        },
        plugins: [plugin],
    });

    return myChart;
    };

    const LineChart = ({ labels, dataset1, dataset2, dataset3, total, max, title, obs, obsStr }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const myChart = createLineChart(
            {
                title: title,
                obs: obs,
                labels: labels,
                dataset1: dataset1,
                dataset2: dataset2,
                dataset3: dataset3,
                total: total,
                max: max, // Defina o valor máximo desejado para o eixo Y aqui
            },
            chartRef
        );
    
        return () => {
            myChart.destroy();
        };
    }, [labels, dataset1, dataset2, dataset3, total, max, title, obs, chartRef]);
    
    return <canvas ref={chartRef} width={300} height={200} style={{ maxWidth: '100%' }} />;
    };

export default LineChart;