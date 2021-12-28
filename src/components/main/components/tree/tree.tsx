import * as React from 'react';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import ColumnLeft from './components/left-column/left-column';
import ColumnMain from './components/main-column/main-column';
import ColumnRight from './components/right-column/right-column';

import trees from '../../../../assets/img/tree/trees';
import bg from '../../../../assets/img/bg/bg';
import toysData from '../../../../assets/data/data';

type Props = {
  favoriteToys: number;
  setFavoriteToys: Dispatch<SetStateAction<number>>;
  selectedToys: {
    value: string[];
    setValue: React.Dispatch<React.SetStateAction<string[]>>;
  };
  volumeIsActive: {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export default function Tree(props: Props) {
  const [snowIsActive, setSnowIsActive] = useState<boolean>(() => {
    const saved = localStorage.getItem('snowIsActive');
    const initialValue = saved === 'true' ? true : undefined;
    return initialValue || false;
  });
  useEffect(() => {
    localStorage.setItem('snowIsActive', String(snowIsActive));
  }, [snowIsActive]);
  // TreeChoise
  const [treeChosen, setTreeChosen] = useState<string>(() => {
    const saved = localStorage.getItem('treeChosen');
    const initialValue = saved ? saved : undefined;
    return initialValue || trees[0];
  });
  useEffect(() => {
    localStorage.setItem('treeChosen', treeChosen);
  }, [treeChosen]);
  //BackgrounChoise
  const [bgChosen, setBgChosen] = useState<string>(() => {
    const saved = localStorage.getItem('bgChosen');
    const initialValue = saved ? saved : undefined;
    return initialValue || bg[0];
  });
  useEffect(() => {
    localStorage.setItem('bgChosen', bgChosen);
  }, [bgChosen]);

  return (
    <div className="tree section">
      <ColumnLeft
        trees={trees}
        bg={bg}
        volumeIsActive={props.volumeIsActive}
        snowIsActive={{ value: snowIsActive, setValue: setSnowIsActive }}
        treeChosen={{ value: treeChosen, setValue: setTreeChosen }}

      />
      <ColumnMain
        trees={trees}
        bg={bg}
        volumeIsActive={props.volumeIsActive}
        snowIsActive={{ value: snowIsActive, setValue: setSnowIsActive }}
        treeChosen={{ value: treeChosen, setValue: setTreeChosen }}
      />
      <ColumnRight
        trees={trees}
        bg={bg}
        toysData={toysData}
        favoriteToys={props.favoriteToys}
        setFavoriteToys={props.setFavoriteToys}
        selectedToys={props.selectedToys}
      />
    </div>
  );
}
