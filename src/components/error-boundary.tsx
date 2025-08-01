import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/10">
          <div className="max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-red-200 dark:border-red-800">
            <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-4">
              Something went wrong
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <p><strong>Error:</strong></p>
              <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs overflow-auto">
                {this.state.error?.toString()}
              </pre>
              {this.state.errorInfo && (
                <>
                  <p><strong>Component Stack:</strong></p>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs overflow-auto max-h-32">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </>
              )}
            </div>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined, errorInfo: undefined })}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}