import React from 'react';

type PropsType = {
    buttonName: string
    callBack: ()=> void // ПИШЕМ универсальный салл-бек, т.к. кнопка будет вызывать не только changeFilterTsarHandler (Алл, Актив, Сандж), а и другие! т.е. делит (Х) и пр.
}

export const Button = (props: PropsType) => {  //шаг 2 после салл бек стр.5: включаем рропсы
    const onClickHandler = () => {
        props.callBack ()
    }
    return (
        <button onClick={onClickHandler}>{props.buttonName}</button> ////шаг 3 после стр 9: имя кнопки {buttonName}
    );
};
