import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-red-100 text-red-700">
          <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
          <p className="text-lg">We are working on fixing it.</p>
          
          {this.state.error && (
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-full max-w-xl">
              <h2 className="text-xl font-semibold mb-2">Error Details:</h2>
              <p className="text-sm text-red-800">{this.state.error.toString()}</p>
              <details className="mt-4 text-sm text-gray-600 whitespace-pre-wrap">
                {this.state.errorInfo?.componentStack}
              </details>
            </div>
          )}
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
