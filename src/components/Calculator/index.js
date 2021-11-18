import React, {useState} from "react";
import {Button, Container, Current, Previous, Screen} from "./Styled";

const Calculator = () => {

    const [prev, setPrev] = useState('');
    const [current, setCurrent] = useState('');
    const [operation, setOperation] = useState('');

    const appendValue = el => {
        const value = el.target.getAttribute('data');

        if (value === '.' && String(current).includes('.')) return;

        setCurrent(current + value);
    };

    const handleDelete = () => setCurrent(String(current).slice(0, -1));

    const handleClear = () => {
        setPrev('');
        setCurrent('');
        setOperation('');
    }

    const compute = () => {
        let result;
        let prevNumber = parseFloat(prev);
        let currentNumber = parseFloat(current);

        if (isNaN(prevNumber) || isNaN(currentNumber)) return;

        switch (operation) {
            case '÷':
                result = prevNumber / currentNumber;
                break;
            case 'x':
                result = prevNumber * currentNumber;
                break;
            case '+':
                result = prevNumber + currentNumber;
                break;
            case '-':
                result = prevNumber - currentNumber;
                break;
            default:
                return;
        }

        return result;
    };

    const chooseOperation = el => {
        if (current === '') return;
        if (prev !== '') {
            let value = compute();
            setPrev(value);
        } else {
            setPrev(current);
        }

        setCurrent('');
        setOperation(el.target.getAttribute('data'));
    }

    const equals = () => {
        let value = compute();
        if (value === undefined || value === null) return;

        setCurrent(value);
        setPrev('');
        setOperation('');

    };

    return (
        <Container>
            <Screen>
                <Previous>{prev} {operation}</Previous>
                <Current>{current}</Current>
            </Screen>
            <Button gridSpan={2} control onClick={handleClear}>AC</Button>
            <Button control onClick={handleDelete}>DEL</Button>
            <Button data={'÷'} operation onClick={chooseOperation}>÷</Button>
            <Button data={'7'} onClick={appendValue}>7</Button>
            <Button data={'8'} onClick={appendValue}>8</Button>
            <Button data={'9'} onClick={appendValue}>9</Button>
            <Button data={'x'} operation onClick={chooseOperation}>x</Button>
            <Button data={'4'} onClick={appendValue}>4</Button>
            <Button data={'5'} onClick={appendValue}>5</Button>
            <Button data={'6'} onClick={appendValue}>6</Button>
            <Button data={'+'} operation onClick={chooseOperation}>+</Button>
            <Button data={'1'} onClick={appendValue}>1</Button>
            <Button data={'2'} onClick={appendValue}>2</Button>
            <Button data={'3'} onClick={appendValue}>3</Button>
            <Button data={'-'} operation onClick={chooseOperation}>-</Button>
            <Button data={'.'} period onClick={appendValue}>.</Button>
            <Button data={'0'} onClick={appendValue}>0</Button>
            <Button gridSpan={2} equals onClick={equals}>=</Button>
        </Container>
    );
}

export default Calculator;