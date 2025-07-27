"use client";

import styles from './styles.module.scss';
import {useFormStatus} from 'react-dom'

interface Propiedades{
    nome: string;
}

export function Button({nome}: Propiedades){
    const {pending} = useFormStatus();
    return (
        <button type='submit' className={styles.button} disabled={pending}>
            {pending ? 'Cadastrando...' : nome}
        </button>
    );
}