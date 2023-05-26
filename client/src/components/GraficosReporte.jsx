import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraficosReporte({ onTableVisibilityChange }) {
    const dataPagado = {
        labels: ['Pagado'],
        datasets: [
            {
                data: [1500000, 2500000],
                backgroundColor: ['#3366CC', 'lightgray'],
                borderWidth: 1,
                borderRadius: 5,
                cutout: '80%',
                hoverOffset: 5,
            },
        ],
        onClick: (e, activeEls) => {
            let datasetIndex = activeEls[0].datasetIndex;
            let dataIndex = activeEls[0].index;
            let datasetLabel = e.chart.data.datasets[datasetIndex].label;
            let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
            console.log("In click", datasetLabel, value);
            //link to url with:[chartIds]
        }
    };
    const optionsPagado = {
        onClick: function (evt, element) {
            if (element.length > 0) {
                const datos = dataPagado.labels[element[0].index];
                if (datos === "Pagado") {
                    //setPagadoVisibility(true);
                    onTableVisibilityChange(false, false, true); //GRAFO, DEUDA, PAGADO
                }
            }
        },
        onHover: (event, chartElement) => {
            event.native.target.style.cursor = "pointer"
        }
    };

    const plugins = [{
        beforeDraw: function (chart) {
            var width = 200,
                height = 200,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 200).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            var text = "1.500.000" + " Gs",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 1.75;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]

    const dataDebt = {
        labels: ['Debe'],
        datasets: [
            {
                data: [200000, 1500000],
                backgroundColor: ['#BF0A30', 'lightgray'],
                borderWidth: 1,
                borderRadius: 5,
                cutout: '80%',
                hoverOffset: 5,
            },
        ],
    };
    const optionsDebt = {
        onClick: function (evt, element) {
            if (element.length > 0) {
                const datos = dataDebt.labels[element[0].index];
                if (datos === "Debe") {
                    //setTableVisibility(true);
                    onTableVisibilityChange(false, true, false);
                }
            }
        },
        onHover: (event, chartElement) => {
            event.native.target.style.cursor = "pointer"
        }
    };
    const pluginsDebt = [{
        beforeDraw: function (chart) {
            var width = 200,
                height = 200,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 200).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            var text = "200.000" + " Gs",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 1.75;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]

  return (
    <div className="">
                        <div className="chart-container is-flex is-align-items-center">
                            <h1>Programado: </h1> <p className='is-size-4 mb-2'> 8.500.000 Gs.</p>
                        </div>
                        <div className="charts is-flex">
                            <div className="chart-container is-flex is-flex-direction-column is-align-items-center" style={{ width: '200px', height: '200px' }}>
                                <Doughnut data={dataPagado} options={optionsPagado} plugins={plugins} />
                                <p className='is-size-4'>Pagado</p>
                            </div>
                            <div className="chart-container is-flex is-flex-direction-column is-align-items-center" style={{ width: '200px', height: '200px' }}>
                                <Doughnut data={dataDebt} options={optionsDebt} plugins={pluginsDebt} />
                                <p className='is-size-4'>Deuda</p>
                            </div>
                        </div>
                    </div>
  )
}
