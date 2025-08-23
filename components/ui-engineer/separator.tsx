import type React from "react"

type SeparatorProps = {
  children?: React.ReactNode
  orientation?: "horizontal" | "vertical"
  showChildren?: boolean
  verticalTextDirection?: "left" | "right"
  textPosition?: "start" | "center" | "end"
}

export default function Separator({
  children = "Or Continue With",
  orientation = "horizontal",
  showChildren = true,
  verticalTextDirection = "right",
  textPosition = "center",
}: SeparatorProps) {
  // Get positioning classes based on orientation and textPosition
  const getPositionClasses = () => {
    if (orientation === "vertical") {
      switch (textPosition) {
        case "start":
          return "items-start"
        case "end":
          return "items-end"
        default:
          return "items-center"
      }
    } else {
      switch (textPosition) {
        case "start":
          return "justify-start"
        case "end":
          return "justify-end"
        default:
          return "justify-center"
      }
    }
  }

  if (orientation === "vertical") {
    return (
      <div className="relative h-full flex justify-center">
        <div className="absolute inset-0 flex justify-center">
          <span className="h-full border-l" />
        </div>
        {showChildren && (
          <div className={`relative flex text-xs uppercase ${getPositionClasses()}`}>
            <span
              className={`bg-card text-primary-foreground-darker/75 px-2 whitespace-nowrap ${
                verticalTextDirection === "left" ? "-rotate-90" : "rotate-90"
              }`}
            >
              {children}
            </span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      {showChildren && (
        <div className={`relative flex text-xs uppercase ${getPositionClasses()}`}>
          <span className="bg-card text-primary-foreground-darker/75 px-2">{children}</span>
        </div>
      )}
    </div>
  )
}
