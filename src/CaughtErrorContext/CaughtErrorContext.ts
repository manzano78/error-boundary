import { createContext, useContext } from 'react'
import { CaughtErrorContext } from './CaughtErrorContext-types'

const CaughtErrorContext = createContext<CaughtErrorContext>(undefined as any)

export const CaughtErrorContextProvider = CaughtErrorContext.Provider

export function useCaughtError() {
  return useContext(CaughtErrorContext)
}
