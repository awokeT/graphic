import React, { useState, useRef } from 'react';
import Graphic from '../components/Graphic'


export default function MainPage() {
    const [data, setData] = useState({acertos: '', erros: '', acertosComSuporte: '', title: '', obs: ''})
    const [finalData, setFinalData] = useState({
        title: '',
        obs: '',
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
        const {title, obs} = data;
        const dataset1 = data.acertos.split(',');
        const dataset2 = data.erros.split(',');
        const dataset3 = data.acertosComSuporte.split(',');
        const labels = []
        for (let index= 0; index < dataset1.length +1; index ++) {
            labels.push(index)
        }

        const total = somarArrays(dataset1,dataset2,dataset3)
        const max1 = maxNum(total);
        const max = max1;
        setFinalData({
            title,
            obs,
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
                <h3>Nome do Grafico</h3>
                <input value={data.title} name='title' className="input-text" type="text" onChange={ handleChange }/>
                <h3>Acertos</h3>
                <input value={data.acertos} name='acertos' className="input-text" type="text" onChange={ handleChange }/>
                <h3>Erros</h3>
                <input value={data.erros} name='erros' className="input-text" type="text" onChange={ handleChange }/>
                <h3>Acertos com Suporte</h3>
                <input value={data.acertosComSuporte} name='acertosComSuporte' className="input-text" type="text" onChange={ handleChange }/>
                <span>Observações</span>
                <textarea value={data.obs} name='obs' className="textarea" type="text" maxLength={240} onChange={ handleChange } />
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