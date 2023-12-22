import React from 'react'

interface ButtonWithIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  label?: string
  variant?: ButtonWithIconVariant
}

export enum ButtonWithIconVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

const getVariantClass = (variant?: ButtonWithIconVariant): string => {
  switch (variant) {
    case ButtonWithIconVariant.Primary:
      return 'group-hover:bg-customRed-930 bg-customRed-900 text-white'
    case ButtonWithIconVariant.Secondary:
      return 'group-hover:bg-customRed-50 bg-customRed-25 text-customRed-900 border-1 border-customRed-900'
    case ButtonWithIconVariant.Tertiary:
      return 'group-hover:bg-zinc-400 group-hover:text-white bg-slate-300 text-customRed-900 border-1 border-customRed-900'
    default:
      return 'group-hover:bg-customRed-930 bg-customRed-900 text-white'
  }
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  icon,
  label,
  variant = ButtonWithIconVariant.Primary,
  className,
  ...props
}) => {
  const variantClass = getVariantClass(variant)

  return (
    <button {...props} className={`group ${className}`}>
      <span
        className={`py-1 px-2 ${variantClass} border-collapse rounded-sm group-hover:shadow-lg gap-1 justify-between uppercase flex items-center`}
      >
        {icon ? icon : null}
        {label ? <span>{label}</span> : null}
      </span>
    </button>
  )
}

export default ButtonWithIcon
