import {SetStateAction, useCallback, useState, useRef} from 'react'
import equal from 'fast-deep-equal/es6'
import {UseProgStateResponse, Dispatch} from './types'

/**
 * useProgState React Hook
 * @param {T | function} [initial] - Initial state
 * @returns {[currentState: T, setState: (value?: A, preventRender?: boolean) => void, stateGetter: () => T]}
 */
export const useProgState = <T, >(initial?: T | (() => T)): UseProgStateResponse<T> => {
    const [state, setState] = useState<T>(initial as T)
    const stateInRef: any = useRef<T>(initial as T) as any

    const setStateInRef = (value?: T) => {
        stateInRef.current = value
    }

    const progSetter = useCallback(
        (value?: T, preventRender?: boolean) => {
            if (preventRender) {
                setStateInRef(value)
                return
            }

            switch (typeof value) {
                case 'function':
                    setState(value)
                    break
                case 'object':
                    if (!equal(value, state)) {
                        setState(value)
                        setStateInRef(value)
                    }
                    break
                default:
                    if (state !== value) {
                        setState(value as T)
                        setStateInRef(value)
                    }
            }
        },
        [state, setState, stateInRef]
    )

    const stateGetter = (): T => stateInRef.current
    
    // @ts-ignore
    return [stateInRef.current, progSetter, stateGetter]
}
