import { AlertTriangle, XCircle, CheckCircle } from "lucide-react"

interface AIDetector {
  name: string
  status: "detected" | "warning" | "passed"
  percentage?: number
}

interface AIDetectionResultProps {
  overallPercentage: number
  detectors: AIDetector[]
  isLoading?: boolean
}

export function AIDetectionResult({ overallPercentage, detectors, isLoading = false }: AIDetectionResultProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Checking for AI...</p>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "detected":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "passed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <XCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "detected":
        return "text-red-600"
      case "warning":
        return "text-yellow-600"
      case "passed":
        return "text-green-600"
      default:
        return "text-red-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="text-center">
        <div className="text-4xl font-bold mb-2">{overallPercentage}%</div>
        <div className="text-gray-600 font-medium mb-4">HUMAN WRITTEN</div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              overallPercentage < 30 ? "bg-red-500" : overallPercentage < 70 ? "bg-yellow-500" : "bg-green-500"
            }`}
            style={{ width: `${overallPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Detector Results */}
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {detectors.slice(0, 6).map((detector, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              {getStatusIcon(detector.status)}
              <span className={getStatusColor(detector.status)}>{detector.name}</span>
            </div>
          ))}
        </div>

        {detectors.length > 6 && (
          <div className="grid grid-cols-3 gap-2">
            {detectors.slice(6).map((detector, index) => (
              <div key={index + 6} className="flex items-center space-x-2 text-sm">
                {getStatusIcon(detector.status)}
                <span className={getStatusColor(detector.status)}>{detector.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
