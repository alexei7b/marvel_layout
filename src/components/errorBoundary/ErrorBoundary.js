import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }


    // после того как создали state, можно создать componentDidCatch
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        // изменим state
        this.setState({
            error: true
        })
    }

    // теперь этот state, можно использовать в методе render
    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        return this.props.children;
    }
}

export default ErrorBoundary;