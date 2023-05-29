import React, { useState } from 'react';
import DeudaTable from '../components/DeudaTable';
import PagadoTable from '../components/PagadoTable';
import GraficosReporte from '../components/GraficosReporte';


export default function Reporte() {

    const [isGrafoVisible, setGrafoVisibility] = useState(true);
    const [isDeudaVisible, setDeudaVisibility] = useState(false);
    const [isPagadoVisible, setPagadoVisibility] = useState(false);

    const handleTableVisibilityChange = (grafo, deuda, pagado) => {
        setGrafoVisibility(grafo);
        setDeudaVisibility(deuda);
        setPagadoVisibility(pagado);
    };

    const handleDeudaClose = () => {
        setDeudaVisibility(false);
        setGrafoVisibility(true);
    };
    const handlePagadoClose = () => {
        setPagadoVisibility(false);
        setGrafoVisibility(true);
    };

    return (
        <div className='m-2'>
            <div className='has-background-light p-6'>
                <h1>Reporte</h1>
                <div className="main-display">
                    <div>
                        <div className="select">
                            <select>
                                <option>Enero</option>
                                <option>Febrero</option>
                            </select>
                        </div>
                        {/*CONCURRENCIA, PRODUCTOS MAS VENDIDOS,  */}
                    </div>
                    <hr className='hr2' />
                    {isGrafoVisible && <GraficosReporte onTableVisibilityChange={handleTableVisibilityChange} />}
                    {isDeudaVisible && <DeudaTable onClose={handleDeudaClose} />}
                    {isPagadoVisible && <PagadoTable onClose={handlePagadoClose} />}
                </div>
            </div>
        </div>
    )
}
