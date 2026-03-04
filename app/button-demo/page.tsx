import Button from '@/components/Button';

export default function ButtonDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-textPrimary mb-4">
            Button Component Demo
          </h1>
          <p className="text-lg text-textSecondary">
            Following the 🎨 Soft Blue Minimal Color System
          </p>
        </div>

        {/* Color System Reference */}
        <div className="mb-12 p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-textPrimary mb-4">
            🔵 Color System
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-lg mx-auto mb-2" />
              <p className="font-medium text-sm">Primary 500</p>
              <p className="text-xs text-textSecondary">#3A7BFF</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-400 rounded-lg mx-auto mb-2" />
              <p className="font-medium text-sm">Primary 400</p>
              <p className="text-xs text-textSecondary">#5C93FF</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-300 rounded-lg mx-auto mb-2" />
              <p className="font-medium text-sm">Primary 300</p>
              <p className="text-xs text-textSecondary">#8FB5FF</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-lg mx-auto mb-2" />
              <p className="font-medium text-sm">Primary 100</p>
              <p className="text-xs text-textSecondary">#EAF2FF</p>
            </div>
          </div>
        </div>

        {/* Button Variants */}
        <div className="space-y-8">
          {/* Primary Buttons */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-textPrimary mb-4">
              Primary Buttons
            </h3>
            <p className="text-textSecondary mb-6">
              Uses Primary 500 (#3A7BFF) for main actions
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="sm">
                Small Primary
              </Button>
              <Button variant="primary" size="md">
                Medium Primary
              </Button>
              <Button variant="primary" size="lg">
                Large Primary
              </Button>
              <Button variant="primary" size="md" loading>
                Loading...
              </Button>
              <Button variant="primary" size="md" disabled>
                Disabled
              </Button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-textPrimary mb-4">
              Secondary Buttons
            </h3>
            <p className="text-textSecondary mb-6">
              Uses Primary 100 background with Primary 500 text
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="sm">
                Small Secondary
              </Button>
              <Button variant="secondary" size="md">
                Medium Secondary
              </Button>
              <Button variant="secondary" size="lg">
                Large Secondary
              </Button>
              <Button variant="secondary" size="md" loading>
                Loading...
              </Button>
              <Button variant="secondary" size="md" disabled>
                Disabled
              </Button>
            </div>
          </div>

          {/* Outline Buttons */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-textPrimary mb-4">
              Outline Buttons
            </h3>
            <p className="text-textSecondary mb-6">
              Primary 500 border and text, fills on hover
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm">
                Small Outline
              </Button>
              <Button variant="outline" size="md">
                Medium Outline
              </Button>
              <Button variant="outline" size="lg">
                Large Outline
              </Button>
              <Button variant="outline" size="md" loading>
                Loading...
              </Button>
              <Button variant="outline" size="md" disabled>
                Disabled
              </Button>
            </div>
          </div>

          {/* Ghost Buttons */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-textPrimary mb-4">
              Ghost Buttons
            </h3>
            <p className="text-textSecondary mb-6">
              Subtle interaction with Primary 100 hover background
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="ghost" size="sm">
                Small Ghost
              </Button>
              <Button variant="ghost" size="md">
                Medium Ghost
              </Button>
              <Button variant="ghost" size="lg">
                Large Ghost
              </Button>
              <Button variant="ghost" size="md" loading>
                Loading...
              </Button>
              <Button variant="ghost" size="md" disabled>
                Disabled
              </Button>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-textPrimary mb-4">
              Usage Examples
            </h3>
            <div className="space-y-6">
              {/* Form Actions */}
              <div>
                <h4 className="font-medium text-textPrimary mb-3">
                  Form Actions
                </h4>
                <div className="flex gap-3">
                  <Button variant="primary" size="md">
                    Submit
                  </Button>
                  <Button variant="outline" size="md">
                    Cancel
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="font-medium text-textPrimary mb-3">
                  Navigation
                </h4>
                <div className="flex gap-3">
                  <Button variant="primary" size="md">
                    Get Started
                  </Button>
                  <Button variant="secondary" size="md">
                    Learn More
                  </Button>
                  <Button variant="ghost" size="md">
                    Skip
                  </Button>
                </div>
              </div>

              {/* Cards */}
              <div>
                <h4 className="font-medium text-textPrimary mb-3">
                  Card Actions
                </h4>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h5 className="font-medium text-textPrimary mb-2">
                    Mathematics Competition 2026
                  </h5>
                  <p className="text-textSecondary text-sm mb-4">
                    Join the next APMO competition...
                  </p>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm">
                      Register
                    </Button>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
