import React, { useState, useRef } from 'react';
import Graphic from '../components/Graphic'

export default function MainPage() {
    const [data, setData] = useState({acertos: '', erros: '', acertosComSuporte: ''})
    const [finalData, setFinalData] = useState({
        dataset1: [0],
        dataset2: [0],
        dataset3: [0],
        labels: [0],
        max: 0,
        total: [0],
        chartRef: null,
    });
    const chartRef = useRef(null);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value,
        });
    };

    function somarArrays(array1, array2, array3) {
        const resultado = [];
    
        for (let i = 0; i < array1.length; i++) {
            const soma = Number(array1[i]) + Number(array2[i]) + Number(array3[i]);
            resultado.push(soma);
        }
    
        return resultado;
    }

    function maxNum(array) {
        return Math.max(...array);
    }

    function handleClick() {
        const dataset1 = data.acertos.split(',');
        const dataset2 = data.erros.split(',');
        const dataset3 = data.acertosComSuporte.split(',');
        const labels = []
        for (let index= 0; index < dataset1.length +1; index ++) {
            labels.push(index)
        }

        const total = somarArrays(dataset1,dataset2,dataset3)
        const max = maxNum(total);

        setFinalData({
            dataset1,
            dataset2,
            dataset3,
            labels,
            max,
            total,
        });
        
    }

    return(
        <div className='main'>
            <div className="container">
                <h2>Acertos</h2>
                <input value={data.acertos} name='acertos' className="input-text" type="text" onChange={ handleChange }/>
                <h2>Erros</h2>
                <input value={data.erros} name='erros' className="input-text" type="text" onChange={ handleChange }/>
                <h2>Acertos com Suporte</h2>
                <input value={data.acertosComSuporte} name='acertosComSuporte' className="input-text" type="text" onChange={ handleChange }/>
                <div className='div-button'>
                    <button className='button' onClick={handleClick}type='button'>Gerar Gráfico</button>
                </div>
            </div>
            <div className='container1'>
                <Graphic {...finalData} chartRef={chartRef} /> 
            </div>
        </div>
    )
}