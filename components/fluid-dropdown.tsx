"use client"

import * as React from "react"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { ChevronDown, Shirt, Briefcase, Smartphone, Home, Layers } from "lucide-react"

// Utility function for className merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// Custom hook for click outside detection
function useClickAway(ref: React.RefObject<HTMLElement | null>, handler: (event: MouseEvent | TouchEvent) => void) {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}

// Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline"
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "outline" && "border border-neutral-700 bg-transparent",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

// Types


// Icon wrapper with animation
const IconWrapper = ({
  icon: Icon,
  isHovered,
  color,
}: { icon: React.ElementType; isHovered: boolean; color: string }) => (
  <motion.div
    className="w-4 h-4 mr-2 relative"
    initial={false}
    animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
  >
    <Icon className="w-4 h-4" />
    {isHovered && (
      <motion.div
        className="absolute inset-0"
        style={{ color }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Icon className="w-4 h-4" strokeWidth={2} />
      </motion.div>
    )}
  </motion.div>
)

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
}

// Main component
export interface DropdownItem {
  id: string
  label: string
  icon: React.ElementType
  color: string
}

interface FluidDropdownProps {
  items: DropdownItem[]
  selectedItem: DropdownItem
  onSelect: (item: DropdownItem) => void
  className?: string
}

export function FluidDropdown({ items, selectedItem, onSelect, className }: FluidDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  useClickAway(dropdownRef, () => setIsOpen(false))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cn("w-full max-w-md relative", className)}
        ref={dropdownRef}
      >
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full justify-between bg-neutral-900/80 text-neutral-400",
            "hover:bg-neutral-800 hover:text-neutral-200",
            "focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 focus:ring-offset-black",
            "transition-all duration-200 ease-in-out",
            "border border-white/10 focus:border-neutral-700",
            "h-10 px-3 py-1.5 rounded-lg", // Adjusted padding/height/radius
            isOpen && "bg-neutral-800 text-neutral-200",
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="flex items-center text-xs font-medium text-neutral-200"> {/* Added text styling */}
            <IconWrapper
              icon={selectedItem.icon}
              isHovered={false}
              color={selectedItem.color}
            />
            {selectedItem.label}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center w-5 h-5 ml-2" // Added margin
          >
            <ChevronDown className="w-3 h-3 text-neutral-500" /> {/* Smaller chevron */}
          </motion.div>
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 1, y: 0, height: 0 }}
              animate={{
                opacity: 1,
                y: 0,
                height: "auto",
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 1,
                },
              }}
              exit={{
                opacity: 0,
                y: 0,
                height: 0,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 1,
                },
              }}
              className="absolute left-0 right-0 top-full mt-2 z-50 w-[200px]" // Fixed width popup
              onKeyDown={handleKeyDown}
            >
              <motion.div
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 p-1 shadow-2xl"
                initial={{ borderRadius: 8 }}
                animate={{
                  borderRadius: 12,
                  transition: { duration: 0.2 },
                }}
                style={{ transformOrigin: "top" }}
              >
                <motion.div
                  className="py-2 relative"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Layout logic for hover effect - simplified for now as exact pixel height matching is fragile with dynamic lists */}
                  {items.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <motion.button
                        onClick={() => {
                          onSelect(item)
                          setIsOpen(false)
                        }}
                        onHoverStart={() => setHoveredItem(item.id)}
                        onHoverEnd={() => setHoveredItem(null)}
                        className={cn(
                          "relative flex w-full items-center px-4 py-2.5 text-xs rounded-md", // Smaller text
                          "transition-colors duration-150",
                          "focus:outline-none",
                          "hover:bg-neutral-800", // Simple hover instead of complex layoutId for robustness
                          selectedItem.id === item.id
                            ? "text-neutral-200 bg-neutral-800/50"
                            : "text-neutral-400",
                        )}
                        whileTap={{ scale: 0.98 }}
                        variants={itemVariants}
                      >
                        <IconWrapper
                          icon={item.icon}
                          isHovered={hoveredItem === item.id}
                          color={item.color}
                        />
                        {item.label}
                      </motion.button>
                    </React.Fragment>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}