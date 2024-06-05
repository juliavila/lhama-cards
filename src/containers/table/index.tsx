import { useState } from 'react';
import './styles.css'

const TOTAL_CARDS = 4;
const TOTAL_COLORS = 4;
const COLORS = ['gray', 'green', 'blue', 'red', 'yellow', 'brown'];

const createArray = (size: number) => [...Array(size).keys()]

const SACK = COLORS.reduce<string[]>((acc, color) => {
  const stack = createArray(10).map(() => color);
  return [...acc, ...stack];
}, []);

const random = (size: number) => Math.floor(Math.random() * size);

const getColor = ():string => {
  const idx = random(SACK.length);
  const [picked] = SACK.splice(idx, 1);
  return picked;
};

const createCard = (): string[] => createArray(TOTAL_CARDS).map(getColor);

const initialCards = createArray(TOTAL_COLORS).map(() => createCard());

export default function Table()  {
  
  const [cards, setCards] = useState<Array<string[]>>(initialCards)

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
