# React useProgState

A progressive React hook that expands useState features

## Features

- It prevents re-render if the value is not changed
- Deep object comparison support, if nested object not changed, it will not re-render
- You can set and access the state inside the event listener callback function
- Optional parameter to prevent re-rendering manually

## Installation

    yarn add react-use-prog-state

or

    npm i --save react-use-prog-state

## Usage

    import { useEffect, useRef } from 'react'
    import { useProgState } from 'react-use-prog-state'
    
    const MyApp = () => {
        const [counter, setCounter] = useProgState({ count: 0 })
        const renderCount = useRef(0)

        useEffect(() => {
            setCounter({ count: 0 })
            // result: render count doesn't change

            console.log(counter)
            // result: { count: 0 }
        }, []}

        return (
            <>
                <p>{renderCount++}</p>
                <p>{counter}</p>
            </>
        )
    }

    export default MyApp

If your value changes and you want to prevent re-rendering manually, you can pass the optional parameter to prevent
re-rendering manually.

    import { useEffect, useRef } from 'react'
    import { useProgState } from 'react-use-prog-state'
    
    const MyApp = () => {
        const [counter, setCounter] = useProgState(0)
        const renderCount = useRef(0)

        useEffect(() => {
            setCounter(1, true) // second param is preventRender?: boolean
            // result: render count doesn't change
        }, []}

        return (
            <>
                <p>{renderCount++}</p>
                <p>{counter}</p>
            </>
        )
    }

    export default MyApp

If you want to access the state inside the event listener callback function, you can use the stateGetter method.

    import { useEffect, useRef } from 'react'
    import { useProgState } from 'react-use-prog-state'
    
    const MyApp = () => {
        const [counter, setCounter, counterGetter] = useProgState(0)
        const renderCount = useRef(0)

        const onKeyDown = (e) => {
            setCounter(counter + 1)

            const counterState = counterGetter()

            console.log(counterState) 
            // the result is 1 and the component is re-rendered 
        }

        useEffect(() => {
            document.addEventListener('keydown', onKeyDown)

            return () => document.removeEventListener('keydown', onKeyDown)
        }, []}

        return (
            <>
                <p>{renderCount++}</p>
                <p>{counter}</p>
            </>
        )
    }

    export default MyApp