import {useEffect, useRef, useState} from 'react';
import './InputList.css';


function InputList({listName, list, setList}) {

    function deleteItem(i) {
        console.log("Attempting Delete");
        let tmp = [...list];
        tmp.splice(i, 1);
        setList(tmp);
    }

    return (
        <div className = "input-list-container">
            <div className = "input-list">
                {listName + ": "}
                {list.map((x, key) => (
                    <div key = {key} className = "input-list-item-1">
                        <div className = "input-list-item-2">
                            <div className = "input-list-item-name">{x}</div>
                            <div className = "input-list-item-btn" 
                                onClick = {() => (deleteItem(key))}>x</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InputList;