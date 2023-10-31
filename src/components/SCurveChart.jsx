import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

function SCurveChart({ cronograma }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (cronograma.lista_cronograma) {
      const ctx = document.getElementById('sCurveChart').getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const progressoRealData = cronograma.lista_cronograma.map(mes => {
        let nivelCorrespondente = mes.niveis.find(nivel => nivel.progresso_real !== '-');
        return nivelCorrespondente ? parseInt(nivelCorrespondente.progresso_real) : 0;
      });

      const progressoPlanejadoData = cronograma.lista_cronograma.map(mes => {
        let nivelCorrespondente = mes.niveis.find(nivel => nivel.progresso_planejado);
        return nivelCorrespondente ? parseInt(nivelCorrespondente.progresso_planejado) : 0;
      });

      const data = {
        labels: cronograma.lista_cronograma.map(mes => mes.mes_cronograma),
        datasets: [
          {
            label: 'Linha de Meta',
            data: progressoPlanejadoData,
            fill: false,
            backgroundColor: 'rgba(220, 38, 38, 0.2)',
            borderColor: 'rgba(220, 38, 38, 1)',
            borderWidth: 3
          },
          {
            label: 'Progresso Real',
            data: progressoRealData,
            fill: false,
            backgroundColor: 'rgba(100, 100, 100, 0.2)',
            borderColor: 'rgba(100, 100, 100, 1)',
            borderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(100, 100, 100, 1)'
          }
        ]
      };

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            },
            x: {
              beginAtZero: true,
              max: data.labels.length - 1
            }
          },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true
                },
                pinch: {
                  enabled: true
                },
                mode: 'x'
              }
            }
          },
          interaction: {
            intersect: false,
            axis: 'x'
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: 'rgb(255, 99, 132)'
            }
          }
        }
      });
    }
  }, [cronograma]);

  return <canvas id="sCurveChart" style={{ height: '100px', width: '300px' }}></canvas>;
}

export default SCurveChart;
