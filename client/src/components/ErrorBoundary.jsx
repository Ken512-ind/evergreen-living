import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.error(
      "Error caught:",
      error,
      info
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

          <div className="text-center">

            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h1>

            <p className="text-gray-600">
              Please refresh the page
            </p>

          </div>

        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;