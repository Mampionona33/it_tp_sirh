import React, { LinkHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonLinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode
  variant?: ButtonLinkVariant
  children: ReactNode
  to: string
}

export enum ButtonLinkVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

const getVariantClass = (variant?: ButtonLinkVariant): string => {
  switch (variant) {
    case ButtonLinkVariant.Primary:
      return 'group-hover:bg-customRed-930 bg-customRed-900 text-white'
    case ButtonLinkVariant.Secondary:
      return 'group-hover:bg-customRed-50 bg-customRed-25 text-customRed-900 border-1 border-customRed-900'
    case ButtonLinkVariant.Tertiary:
      return 'group-hover:bg-zinc-400 group-hover:text-white bg-slate-300 text-customRed-900 border-1 border-customRed-900'
    default:
      return 'group-hover:bg-customRed-930 bg-customRed-900 text-white'
  }
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  to,
  icon,
  variant = ButtonLinkVariant.Primary,
  className,
  ...props
}) => {
  const variantClass = getVariantClass(variant)

  return (
    <Link to={to} {...props} className={`no-underline ${className}`}>
      <span className="group ">
        <span
          className={`flex flex-row rounded-sm justify-center gap-1 text-sm font-semibold px-2 py-1 ${variantClass}`}
        >
          {icon ? icon : null}
          {children ? <span>{children}</span> : null}
        </span>
      </span>
    </Link>
  )
}

export default ButtonLink
