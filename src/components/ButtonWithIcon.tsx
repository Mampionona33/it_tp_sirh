import React from 'react'

interface ButtonWithIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  label?: string
  variant?: ButtonWithIconVariant
}

enum ButtonWithIconVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

const getVariantClass = (variant?: ButtonWithIconVariant): string => {
  switch (variant) {
    case ButtonWithIconVariant.Primary:
      return 'group-hover:bg-customRed-930 bg-customRed-900'
    case ButtonWithIconVariant.Secondary:
      return 'bg-gray-500 text-white'
    case ButtonWithIconVariant.Tertiary:
      return 'bg-green-500 text-white'
    default:
      return 'bg-blue-500 text-white'
  }
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  icon,
  label,
  variant = ButtonWithIconVariant.Primary,
  ...props
}) => {
  const variantClass = getVariantClass(variant)

  return (
    <button {...props} className={`group`}>
      <span
        className={`py-2 px-2.5 ${variantClass} group-hover:shadow-lg gap-1 justify-between uppercase  text-white flex items-center`}
      >
        {icon ? icon : null}
        {label ? <span>{label}</span> : null}
      </span>
    </button>
  )
}

export default ButtonWithIcon
