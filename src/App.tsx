import { useState } from 'react'
import './App.css'
import { Card } from './components/Card/card';
import { FoodData } from './Interface/FoodData';
import { useFoodData } from './Hooks/useFoodData';
import { CreateModal } from './components/Create-modal/create-modal';

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map((foodData: FoodData) => 
          <Card
            price={foodData.price} 
            title={foodData.title} 
            image={foodData.image}
          />
        )}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
      <button onClick={handleOpenModal} className='btn-novo'>novo</button>
    </div>
  )
}

export default App