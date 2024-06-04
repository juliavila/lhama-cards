import { useState } from 'react';
import './styles.css'

const TOTAL_CARDS = 4;
const TOTAL_COLORS = 4;
const COLORS = ['purple', 'green', 'blue', 'red', 'yellow', 'orange']

const random = (size: number) => Math.floor(Math.random() * size);

const createArray = (size: number) => [...Array(size).keys()]

const getColor = () => COLORS[random(COLORS.length)];

const createCard = () =>  createArray(TOTAL_CARDS).map(() => getColor());

export default function Table()  {
  
  const [cards, setCards] = useState<Array<string[]>>(createArray(TOTAL_COLORS).map(() => createCard()))

  const reload = (index: number) => {
    const copy = [...cards];
    copy.splice(index, 1, createCard());
    setCards(copy);
  }

  return (<>
    <div className='table'>
      {cards.map((colors, index) => card(colors, () => reload(index), index))}
    </div>
  </>);
}

const itemCard = (color: string, index: number) => 
  <div key={index + color} className="color" style={{background: color}}></div>

const card = (colors: string[], reload: () => void, index: number) =>
<div key={index} className='card'>
  {colors.map(itemCard)}
  <button onClick={reload}>reload</button>
</div>