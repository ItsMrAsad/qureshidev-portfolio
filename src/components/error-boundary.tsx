"use client";

import { Component, ReactNode } from "react";
import { motion } from "motion/react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to console (in production, send to error tracking service)
        console.error("Error caught by boundary:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = "/";
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-md w-full glass-strong rounded-2xl p-8 text-center"
                    >
                        {/* Error icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center"
                        >
                            <AlertTriangle className="w-8 h-8 text-destructive" />
                        </motion.div>

                        {/* Error message */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold text-foreground mb-2"
                        >
                            Something went wrong
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-muted-foreground mb-6"
                        >
                            We apologize for the inconvenience. An unexpected error has occurred.
                        </motion.p>

                        {/* Error details (development only) */}
                        {process.env.NODE_ENV === "development" && this.state.error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mb-6 p-4 bg-destructive/5 rounded-lg text-left"
                            >
                                <p className="text-xs text-destructive font-mono break-all">
                                    {this.state.error.message}
                                </p>
                            </motion.div>
                        )}

                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex gap-4 justify-center"
                        >
                            <Button onClick={this.handleReload} className="gap-2">
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </Button>
                            <Button variant="outline" onClick={this.handleGoHome} className="gap-2">
                                <Home className="w-4 h-4" />
                                Go Home
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}
