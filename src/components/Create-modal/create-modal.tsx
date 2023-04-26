import { useEffect, useState } from 'react';
import { useFoodDataMutate } from '../../Hooks/useFoodDataMutante';
import { FoodData } from '../../Interface/FoodData';

import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}   

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps){
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, isLoading } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title, 
            price,
            image
        }
        mutate(foodData)
    }

    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [closeModal, isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <div className="modal-close">
                <button onClick={closeModal} className="btn-close">
                  <span className="icon-cross"></span>
                  <span className="visually-hidden">Close</span>
                </button>
                </div>
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="Titulo" value={title} updateValue={setTitle}/>
                    <Input label="Preço" value={price} updateValue={setPrice}/>
                    <Input label="URL da Imagem" value={image} updateValue={setImage}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? 'postando...' : 'postar'}
                </button>
                
            </div>
        </div>
    )
}