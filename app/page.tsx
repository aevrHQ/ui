"use client";

import * as React from "react";
import { useState } from "react";
import {
  Copy,
  Check,
  ExternalLink,
  Package,
  Code,
  Zap,
  Shield,
  Terminal,
  ArrowRight,
  Github,
} from "lucide-react";
import { Button } from "@/registry/lagos/ui/button";
import { InfoBox } from "@/registry/lagos/ui/info-box";
import Loader from "@/registry/lagos/ui/loader";
import SummaryCard from "@/registry/lagos/ui/summary-card";

// Copy button component
const CopyButton: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors ${
        className || ""
      }`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
};

// Code block component
const CodeBlock: React.FC<{ children: string; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="relative">
      {title && (
        <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 rounded-t-lg border-b border-gray-700">
          <span className="text-sm font-mono">{title}</span>
          <CopyButton
            text={children}
            className="bg-gray-700 hover:bg-gray-600 text-gray-200"
          />
        </div>
      )}
      <pre
        className={`bg-gray-900 text-gray-100 p-4 ${
          title ? "rounded-b-lg" : "rounded-lg"
        } overflow-x-auto text-sm`}
      >
        <code>{children}</code>
      </pre>
      {!title && (
        <CopyButton
          text={children}
          className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-gray-200"
        />
      )}
    </div>
  );
};

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<
    "quick-start" | "components" | "utils"
  >("quick-start");

  const components = [
    {
      name: "button",
      title: "Button",
      description:
        "A versatile button component with multiple variants and sizes",
      preview: <Button variant="primary">Click me</Button>,
    },
    {
      name: "info-box",
      title: "Info Box",
      description: "Display information, warnings, errors, and status messages",
      preview: (
        <InfoBox
          type="success"
          title="Success!"
          description="Operation completed successfully"
        />
      ),
    },
    {
      name: "loader",
      title: "Loader",
      description: "Animated loading spinner for async operations",
      preview: <Loader loading={true} />,
    },
    {
      name: "summary-card",
      title: "Summary Card",
      description: "Display summary information in an organized card format",
      preview: (
        <SummaryCard
          items={[
            {
              label: "Item 1",
              value: "Value 1",
            },
            {
              label: "Item 2",
              value: "Value 2",
            },
            {
              label: "Item 3",
              value: "Value 3",
            },
          ]}
          summary={{
            label: "Summary",
            value: "Summary Value",
          }}
        />
      ),
    },
  ];

  const utils = [
    {
      name: "number-formatter",
      title: "Number Formatter",
      description:
        "Format numbers, currencies, and card numbers with locale support",
      features: [
        "Currency formatting",
        "Number formatting",
        "Card number masking",
        "Locale support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Package className="w-4 h-4" />
              Custom shadcn/ui Registry
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              AEVR Registry
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A collection of beautiful, accessible, and production-ready
              components built on top of shadcn/ui. Get started in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Terminal className="w-5 h-5" />
                Get Started
              </Button>
              <Button variant="secondary" size="lg">
                <Github className="w-5 h-5" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm border">
          {[
            { id: "quick-start", label: "Quick Start", icon: Zap },
            { id: "components", label: "Components", icon: Package },
            { id: "utils", label: "Utilities", icon: Code },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() =>
                setSelectedTab(id as "quick-start" | "components" | "utils")
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTab === id
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Quick Start Tab */}
        {selectedTab === "quick-start" && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Prerequisites */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Prerequisites</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Next.js 13+ project
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Tailwind CSS configured
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    shadcn/ui initialized
                  </li>
                </ul>
              </div>

              {/* Quick Install */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Quick Install</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Add any component with one command:
                </p>
                <CodeBlock>
                  npx shadcn@latest add --registry @aevr button
                </CodeBlock>
              </div>
            </div>

            {/* Setup Instructions */}
            <div className="bg-white rounded-xl p-8 shadow-sm border">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Terminal className="w-6 h-6 text-blue-600" />
                Setup Instructions
              </h3>

              <div className="space-y-8">
                {/* Step 1: shadcn/ui Setup */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <h4 className="text-lg font-semibold">
                      Setup shadcn/ui (if not already done)
                    </h4>
                  </div>

                  <div className="pl-11 space-y-4">
                    <p className="text-gray-600">
                      If you haven&apos;t set up shadcn/ui in your project yet,
                      run:
                    </p>
                    <CodeBlock title="terminal">
                      npx shadcn@latest init
                    </CodeBlock>

                    <InfoBox
                      type="info"
                      description="Follow the prompts to configure your project. Choose your style, colors, and other preferences."
                    />
                  </div>
                </div>

                {/* Step 2: Configure Registry */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <h4 className="text-lg font-semibold">
                      Configure Custom Registry
                    </h4>
                  </div>

                  <div className="pl-11 space-y-4">
                    <p className="text-gray-600">
                      Add the AEVR registry to your{" "}
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        components.json
                      </code>{" "}
                      file:
                    </p>

                    <CodeBlock title="components.json">{`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "registries": {
    "@aevr": "https://v1.ui.aevr.space/r/{name}.json"
  }
}`}</CodeBlock>
                  </div>
                </div>

                {/* Step 3: Install Dependencies */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <h4 className="text-lg font-semibold">
                      Install Registry Dependencies
                    </h4>
                  </div>

                  <div className="pl-11 space-y-4">
                    <p className="text-gray-600">
                      Install the required dependencies for AEVR components:
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">npm:</p>
                        <CodeBlock>
                          npm install class-variance-authority tw-animate-css
                          iconsax-react iso-country-currency @untools/logger
                        </CodeBlock>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">yarn:</p>
                        <CodeBlock>
                          yarn add class-variance-authority tw-animate-css
                          iconsax-react iso-country-currency @untools/logger
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Add Components */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <h4 className="text-lg font-semibold">Add Components</h4>
                  </div>

                  <div className="pl-11 space-y-4">
                    <p className="text-gray-600">
                      Now you can add any component from the AEVR registry:
                    </p>

                    <div className="space-y-3">
                      <CodeBlock title="Add a single component">
                        npx shadcn@latest add --registry @aevr button
                      </CodeBlock>
                      <CodeBlock title="Add multiple components">
                        npx shadcn@latest add --registry @aevr button info-box
                        loader
                      </CodeBlock>
                      <CodeBlock title="Add utilities">
                        npx shadcn@latest add --registry @aevr number-formatter
                      </CodeBlock>
                    </div>

                    <InfoBox
                      type="success"
                      title="That's it!"
                      description="Components will be installed to your components/ui/aevr/ directory and utilities to utils/aevr/. Start using them in your project immediately."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Example */}
            <div className="bg-white rounded-xl p-8 shadow-sm border">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-green-600" />
                Usage Example
              </h3>

              <div className="space-y-4">
                <p className="text-gray-600">
                  After installation, import and use components in your React
                  components:
                </p>

                <CodeBlock title="app/page.tsx">{`import { Button } from "@/components/ui/aevr/button";
import { InfoBox } from "@/components/ui/aevr/info-box";
import { formatCurrency } from "@/utils/aevr/number-formatter";

export default function Page() {
  const price = formatCurrency(1234.56, { currency: "USD" });
  
  return (
    <div className="p-6">
      <InfoBox 
        type="success"
        title="Welcome!"
        description="Your AEVR components are ready to use."
        actions={[
          { name: "Get Started", type: "primary" }
        ]}
      />
      
      <Button variant="primary" className="mt-4">
        Buy for {price}
      </Button>
    </div>
  );
}`}</CodeBlock>
              </div>
            </div>
          </div>
        )}

        {/* Components Tab */}
        {selectedTab === "components" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Available Components</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Production-ready components built with accessibility and
                customization in mind. Each component follows shadcn/ui patterns
                and conventions.
              </p>
            </div>

            <div className="grid gap-6">
              {components.map((component) => (
                <div
                  key={component.name}
                  className="bg-white rounded-xl p-6 shadow-sm border"
                >
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold">
                          {component.title}
                        </h3>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-mono">
                          {component.name}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {component.description}
                      </p>

                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-800">
                          Installation:
                        </h4>
                        <CodeBlock>{`npx shadcn@latest add --registry @aevr ${component.name}`}</CodeBlock>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center min-h-[150px]">
                      {component.preview}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Utils Tab */}
        {selectedTab === "utils" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Utility Functions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Helpful utility functions to enhance your development workflow.
                These utilities handle common tasks like formatting and
                validation.
              </p>
            </div>

            <div className="grid gap-6">
              {utils.map((util) => (
                <div
                  key={util.name}
                  className="bg-white rounded-xl p-6 shadow-sm border"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold">{util.title}</h3>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-mono">
                      {util.name}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{util.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-sm text-gray-800 mb-3">
                        Features:
                      </h4>
                      <ul className="space-y-2">
                        {util.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <Check className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-800 mb-3">
                        Installation:
                      </h4>
                      <CodeBlock>{`npx shadcn@latest add --registry @aevr ${util.name}`}</CodeBlock>
                    </div>
                  </div>

                  {util.name === "number-formatter" && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-medium text-sm text-gray-800 mb-3">
                        Usage Examples:
                      </h4>
                      <CodeBlock>{`import { formatCurrency, formatNumber, formatCardNumber } from "@/utils/aevr/number-formatter";

// Currency formatting
formatCurrency(1234.56, { currency: "USD" }); // "$1,234.56"
formatCurrency(1234.56, { currency: "EUR", locale: "de-DE" }); // "1.234,56 €"

// Number formatting
formatNumber(1234.567, { maximumFractionDigits: 2 }); // "1,234.57"

// Card number formatting with masking
formatCardNumber("1234567890123456", { mask: true }); // "**** **** **** 3456"`}</CodeBlock>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose AEVR Registry?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Built with modern development practices and designed for
              production use.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Production Ready</h3>
              <p className="text-blue-100 text-sm">
                Thoroughly tested components ready for production use
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Easy Integration</h3>
              <p className="text-blue-100 text-sm">
                Seamless integration with existing shadcn/ui projects
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Customizable</h3>
              <p className="text-blue-100 text-sm">
                Built with CVA for easy customization and theming
              </p>
            </div>
          </div>
        </div>

        {/* Getting Help */}
        <div className="mt-12 bg-gray-50 rounded-xl p-8 border">
          <h3 className="text-2xl font-bold mb-6 text-center">Need Help?</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Documentation
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Check out the shadcn/ui documentation for general guidance on
                using components.
              </p>
              <Button variant="secondary" size="sm">
                View Docs
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="bg-white rounded-lg p-6 border">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Github className="w-4 h-4" />
                Issues & Support
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Found a bug or have a feature request? Let us know on GitHub.
              </p>
              <Button variant="secondary" size="sm">
                GitHub Issues
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Package className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">AEVR Registry</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Built with shadcn/ui</span>
              <span>•</span>
              <span>Powered by Next.js</span>
              <span>•</span>
              <a
                href="https://v1.ui.aevr.space"
                className="hover:text-blue-600 transition-colors"
              >
                v1.ui.aevr.space
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
