import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

const PasswordInput = forwardRef(function PasswordInput(
  { placeholder = 'Digite sua senha', className, ...props },
  ref
) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  return (
    <div className="relative">
      <Input
        ref={ref}
        type={passwordIsVisible ? 'text' : 'password'}
        placeholder={placeholder}
        className={`pr-10 ${className ?? ''}`}
        {...props}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        tabIndex={-1}
        className="absolute top-1/2 right-2 h-7 w-7 -translate-y-1/2"
        onClick={() => setPasswordIsVisible((prev) => !prev)}
      >
        {passwordIsVisible ? (
          <EyeOffIcon className="h-4 w-4" />
        ) : (
          <EyeIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
