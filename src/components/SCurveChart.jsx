import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

function SCurveChart({ cronograma }) {
  const chartRef = useRef(null)
  const [niveis, setNiveis] = useState([])
  const [nivelSelecionado, setNivelSelecionado] = useState()
  const [progressoDosNiveis] = useState({})

  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll);
      }
    }, [])



  useEffect(() => {
    if (cronograma.lista_cronograma) {
      cronograma.lista_cronograma.forEach((mes) => {
        mes.niveis.forEach((nivel) => {
          if (!progressoDosNiveis[`${nivel.ordem_nivel} - ${nivel.nome_nivel}`]) {
            progressoDosNiveis[`${nivel.ordem_nivel} - ${nivel.nome_nivel}`] = {
              planejado: [],
              real: []
            }
          }
          progressoDosNiveis[`${nivel.ordem_nivel} - ${nivel.nome_nivel}`].planejado.push(parseFloat(nivel.progresso_planejado.slice(0, -1)))
          progressoDosNiveis[`${nivel.ordem_nivel} - ${nivel.nome_nivel}`].real.push(nivel.progresso_real !== '-' ? parseFloat(nivel.progresso_real.slice(0, -1)) : null)
        })
      })

      const niveis = Object.keys(progressoDosNiveis)
      if (niveis.length > 0) {
        setNiveis(niveis)
        setNivelSelecionado(niveis[0]);
      }
    }
    
  }, [cronograma])

  const filtrarGrafico = () => {
    if (!progressoDosNiveis || !cronograma.lista_cronograma || !nivelSelecionado) {
      return
    } else {

      const ctx = document.getElementById('sCurveChart').getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const data = {
        labels: cronograma.lista_cronograma.map(mes => mes.mes_cronograma),
        datasets: [
          {
            label: 'Linha de Meta',
            data: progressoDosNiveis[nivelSelecionado].planejado,
            fill: false,
            backgroundColor: 'rgba(220, 38, 38, 0.2)',
            borderColor: 'rgba(220, 38, 38, 1)',
            borderWidth: 3
          },
          {
            label: 'Progresso Real',
            data: progressoDosNiveis[nivelSelecionado].real,
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
              },
              pan: {
                enabled: true,
                mode: 'x',
                onPan: function ({ chart }) {

                }
              }
            }
          },
          interaction: {
            intersect: false,
            axis: 'xy'
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
  }

  useEffect(() => {
    filtrarGrafico()
    window.scrollTo(0, scrollPosition)
  }, [nivelSelecionado])

  const handleNivelSelecionadoChange = (event) => {
    setNivelSelecionado(event.target.value);
  }

  return (
    <div className='overflow-auto'>
      <div className="ml-4 mt-5 text-lg">
        <label className='font-medium'>Nível atual: </label>
        <select value={nivelSelecionado} onChange={handleNivelSelecionadoChange} className='border p-2 rounded-lg border-n90'>
          {niveis.map((nivel) => (
            <option key={nivel} value={nivel}>
              {nivel}
            </option>
          ))}
        </select>
      </div>
      <canvas id="sCurveChart"></canvas>
    </div>
  )
}

export default SCurveChart;