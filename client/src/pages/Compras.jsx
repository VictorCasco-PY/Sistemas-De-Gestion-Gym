import React from 'react'

export default function Compras() {
    return (
        <div>
            <h1>Compras</h1>
            <div className='listaItems'>
                <div>
                    <input type="text" className='input' placeholder='Buscar item...' />

                </div>

                <div className='itemFlexOrGrid'>
                    <div className='item'>
                        <h2>Item 1</h2>
                        <p>Descripcion</p>
                        <div>
                            <p>Cantidad: 3</p>
                            <p>Precio: 40$</p>
                        </div>
                    </div>

                    <div className='item'>
                        <h2>Item 1</h2>
                        <p>Descripcion</p>
                        <div>
                            <p>Cantidad: 3</p>
                            <p>Precio: 40$</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='precioYOpciones'>
                <div>
                    <h2>Pago Total</h2>
                    <div>
                        <p>Productos: 100$</p>
                        <h1>Total: 100$</h1>
                    </div>
                    <div>
                        <button className='button'>Comprar</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
