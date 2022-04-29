import react, { Component } from 'react'
import './Calculator.css'
import Button from '../Components/Button'
import Display from '../Components/Display'


const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {
    state = { ...initialState }

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigito = this.addDigito.bind(this)
    }
    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            switch (currentOperation) {
                case '+':
                    values[0] = (values[0] + values[1]).toFixed(2)
                    break
                case '-':
                    values[0] = (values[0] - values[1]).toFixed(2)
                    break
                case '*':
                    values[0] = (values[0] * values[1]).toFixed(2)
                    break
                case '/':
                    values[0] = (values[0] / values[1]).toFixed(2)
                    break
                default:
                    values[0] = this.state.values[0]
                    break
            }
            values[1] = 0

            if (isNaN(values[0]) || !isFinite(values[0])) {
                this.clearMemory()
                return
            }

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }
    
    addDigito(n) {
        
        const i = this.state.current

        if (n === '.' && !Number.isInteger(this.state.values[i])) {
            return
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        const newValue = parseFloat(displayValue)
        const values = [...this.state.values]
        values[i] = newValue
        this.setState({ values })
    }

    render() {

        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" triple click={this.clearMemory} />
                <Button label="/" operation click={this.setOperation} />
                <Button label="7" click={this.addDigito} />
                <Button label="8" click={this.addDigito} />
                <Button label="9" click={this.addDigito} />
                <Button label="*" operation click={this.setOperation} />
                <Button label="4" click={this.addDigito} />
                <Button label="5" click={this.addDigito} />
                <Button label="6" click={this.addDigito} />
                <Button label="-" operation click={this.setOperation} />
                <Button label="1" click={this.addDigito} />
                <Button label="2" click={this.addDigito} />
                <Button label="3" click={this.addDigito} />
                <Button label="+" operation click={this.setOperation} />
                <Button label="0" double click={this.addDigito} />
                <Button label="." click={this.addDigito} />
                <Button label="=" operation click={this.setOperation} />

            </div>
        )
    }
}