import { forwardRef } from 'react'

type Props = React.ComponentProps<'input'>

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        className={`flex h-9 w-full rounded-md border border-neutral-500 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:border-neutral-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
