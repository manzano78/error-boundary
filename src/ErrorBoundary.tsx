import React, { Component, ReactNode } from 'react'
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  ErrorState,
  ToErrorContext
} from './ErrorBoundary-types'
import { CaughtErrorContextProvider } from './CaughtErrorContext'
import memoize from 'fast-memoize'

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private readonly toCaughtErrorContext: ToErrorContext

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
    this.acknowledgeCaughtError = this.acknowledgeCaughtError.bind(this)
    this.toCaughtErrorContext = memoize((error: Error) => [
      error,
      this.acknowledgeCaughtError
    ])
  }

  private static isFunction(arg: any): arg is Function {
    return typeof arg === 'function'
  }

  static getDerivedStateFromError(error: Error): ErrorState {
    return { hasError: true, error }
  }

  acknowledgeCaughtError() {
    this.setState({ hasError: false })
  }

  componentDidCatch(error: Error) {
    const { onCaughtError } = this.props

    if (onCaughtError) {
      onCaughtError(error, this.acknowledgeCaughtError)
    }
  }

  render() {
    if (this.state.hasError) {
      const { error } = this.state
      const { fallback: providedFallback } = this.props
      const caughtErrorContext = this.toCaughtErrorContext(error)
      const fallback = ErrorBoundary.isFunction(providedFallback)
        ? providedFallback(error, this.acknowledgeCaughtError)
        : providedFallback

      return (
        <CaughtErrorContextProvider value={caughtErrorContext}>
          {fallback}
        </CaughtErrorContextProvider>
      )
    }

    return this.props.children
  }
}
