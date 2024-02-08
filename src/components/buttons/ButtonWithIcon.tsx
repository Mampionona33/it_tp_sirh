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

export interface getVariantClassProps {
  variant?: ButtonWithIconVariant
  disabled: boolean
}

const getVariantClass = ({ variant, disabled }: getVariantClassProps): string => {
  switch (variant) {
    case ButtonWithIconVariant.Primary:
      return `${
        disabled
          ? 'bg-slate-300 text-slate-500 border-slate-600 hover:bg-slate-300 hover:text-slate-500 hover:border-slate-600'
          : 'group-hover:bg-customRed-930 bg-customRed-900 text-white'
      }`
    case ButtonWithIconVariant.Secondary:
      return `${
        disabled
          ? 'bg-slate-300 text-slate-500 border-slate-600 hover:bg-slate-300 hover:text-slate-500 hover:border-slate-600'
          : 'group-hover:bg-customRed-50 bg-customRed-25 text-customRed-900 border-1 border-customRed-900'
      }`
    case ButtonWithIconVariant.Tertiary:
      return ` ${
        disabled
          ? 'bg-slate-300 text-slate-500 border-slate-600 hover:bg-slate-300 hover:text-slate-500 hover:border-slate-600'
          : 'group-hover:bg-zinc-400 group-hover:text-white bg-slate-300 text-customRed-900 border-1 border-customRed-900'
      }`
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
  const variantClass = getVariantClass({ variant, disabled: props.disabled ? true : false })

  return (
    <button {...props} className={`group ${className}`}>
      <span
        className={`px-2 py-1 border-collapse rounded-sm gap-1 justify-center text-sm font-semibold flex items-center ${variantClass} ${
          props.disabled ? `cursor-not-allowed ` : 'cursor-pointer group-hover:shadow-lg'
        }`}
      >
        {icon && icon}
        {label && <span>{label}</span>}
      </span>
    </button>
  )
}

export default ButtonWithIcon
