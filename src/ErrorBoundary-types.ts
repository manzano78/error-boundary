import { ReactNode } from 'react'
import {
  AcknowledgeCaughtError,
  CaughtErrorContext
} from './CaughtErrorContext'

export interface ErrorBoundaryProps {
  children?: ReactNode
  fallback?:
    | ReactNode
    | ((error: Error, acknowledgeError: AcknowledgeCaughtError) => ReactNode)
  onCaughtError?: (
    error: Error,
    acknowledgeError: AcknowledgeCaughtError
  ) => void
}

export interface NoErrorState {
  hasError: false
}

export interface ErrorState {
  hasError: true
  error: Error
}

export type ErrorBoundaryState = NoErrorState | ErrorState
export type ToErrorContext = (error: Error) => CaughtErrorContext
