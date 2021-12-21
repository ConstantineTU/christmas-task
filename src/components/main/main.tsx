import * as React from 'react';
import { Dispatch, useState, SetStateAction } from 'react';
import './main.scss';

import Home from './components/home/home';
import FiltersAndToys from './components/filters&toys/filters&toys';
import Tree from './components/tree/tree';

type Props = {
  activePage: string;
  toysData: {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: string;
    color: string;
    size: string;
    favorite: boolean;
  }[];
  favoriteToys: number;
  setFavoriteToys: Dispatch<SetStateAction<number>>;
};

type toysDataType = {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
};

export default function Main({ activePage, toysData, favoriteToys, setFavoriteToys }: Props) {
  const [filters, setFilters] = useState({
    search: '',
    sorting: 'By title(A-Z)',
    shapeFilter: ['Ball'],
    colourFilter: ['Red'],
    sizeFilter: ['Big'],
    quantityFilter: { min: '', max: '' },
    purchaseYearFilter: { min: '', max: '' },
    favoriteFilter: true,
  });

  function SortArray(a: toysDataType, b: toysDataType): number {
    if (sorts === 'AZ') {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    } else if (sorts === 'ZA') {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    } else if (sorts === 'yearAscending') {
      return +a.year - +b.year;
    } else if (sorts === 'yearDescending') {
      return +b.year - +a.year;
    } else {
      return 0;
    }
  }

  const pages = ['домашняя', 'игрушки', 'ёлка'];
  const [search, setSearch] = useState<string>('');
  const [sorts, setSorts] = useState<string>('');
  const [shapeFilter, setShapeFilter] = useState<Array<string>>([
    'колокольчик',
    'шар',
    'шишка',
    'звезда',
    'снежинка',
    'фигурка',
  ]);
  const [colorFilter, setColorFilter] = useState<Array<string>>(['белый', 'желтый', 'красный', 'синий', 'зелёный']);
  const shapeFilterToysData = toysData.filter((toy) => {
    for (let i = 0; i < shapeFilter.length; i++) {
      if (toy.shape.includes(shapeFilter[i])) {
        return toy.shape.includes(shapeFilter[i]);
      }
    }
    return;
  });
  const colorFilterToysData = shapeFilterToysData.filter((toy) => {
    for (let i = 0; i < colorFilter.length; i++) {
      if (toy.color.includes(colorFilter[i])) {
        return toy.color.includes(colorFilter[i]);
      }
    }
    return;
  });
  const newToysData = colorFilterToysData
    .filter((toy) => toy.name.toLowerCase().includes(search.toLowerCase()))
    .sort(SortArray);

  return (
    <main className="main">
      {activePage === pages[0] && <Home />}
      {activePage === pages[1] && (
        <FiltersAndToys
          toysData={newToysData}
          favoriteToys={favoriteToys}
          setFavoriteToys={setFavoriteToys}
          search={{ value: search, setValue: setSearch }}
          sorts={{ value: sorts, setValue: setSorts }}
          shapeFilter={{ value: shapeFilter, setValue: setShapeFilter }}
          colorFilter={{ value: colorFilter, setValue: setColorFilter }}
        />
      )}
      {activePage === pages[2] && <Tree />}
    </main>
  );
}
