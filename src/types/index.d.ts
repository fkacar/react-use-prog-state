import {SetStateAction} from 'react'

export type Dispatch<A> = (value?: A, preventRender?: boolean) => void

export type UseProgStateResponse<T> = [value?: T, setter?: Dispatch<SetStateAction<T>>, stateGetter?: () => T]