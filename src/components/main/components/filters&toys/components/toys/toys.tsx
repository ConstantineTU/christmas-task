import * as React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import CardItem from './components/toy';
import './toys.scss';

type Props = {
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

export default function Toys(props: Props) {
  return (
    <div className="card-items-wrap">
      <div className="card-items-title-container">
        <h2 className="card-items-title">Игрушки</h2>
        <div className="card-items-favorite">{props.favoriteToys}</div>
      </div>
      <div className="card-items">
        {props.toysData.map((data, index) => (
          <CardItem key={index} data={data} favoriteToys={props.favoriteToys} setFavoriteToys={props.setFavoriteToys} />
        ))}
      </div>
    </div>
  );
}
