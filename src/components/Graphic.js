import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const createLineChart = (finalData, chartRef) => {
    const { max } = finalData;
    const ctx = chartRef.current.getContext('2d');

    // Define o fundo do canvas como transparente
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, chartRef.current.width, chartRef.current.height);
    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, args, options) => {
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
            tension: 0.1,
            },
            {
            label: 'Erros',
            data: finalData.dataset2,
            fill: false,
            borderColor: 'rgb(255,0,0)',
            backgroundColor: 'rgb(255,0,0)',
            tension: 0.1,
            },
            {
            label: 'Acertos com Suporte',
            data: finalData.dataset3,
            fill: false,
            borderColor: 'rgb(255, 255, 0)',
            backgroundColor: 'rgb(255, 255, 0)',
            tension: 0.1,
            },
            {
            label: 'Demandas',
            data: finalData.total,
            fill: false,
            borderColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(0, 0, 0)',
            tension: 0.1,
            },
        ],
        },
        options: {
            plugins: {
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

    const LineChart = ({ labels, dataset1, dataset2, dataset3, total, max }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const myChart = createLineChart(
            {
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
            // Limpar o gráfico ao desmontar o componente
            myChart.destroy();
        };
    }, [labels, dataset1, dataset2, dataset3, total, max, chartRef]);
    
    return <canvas ref={chartRef} width={300} height={200} style={{ maxWidth: '100%' }} />;
    };

export default LineChart;