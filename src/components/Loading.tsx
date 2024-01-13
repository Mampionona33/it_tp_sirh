import React from 'react'

export interface LoadingProps {
  width?: string
  height?: string
}

/**
 * Renders a loading spinner component.
 *
 * @param {LoadingProps} width - The width of the component. Defaults to 'w-6'.
 * @param {LoadingProps} height - The height of the component. Defaults to 'h-6'.
 * @return {JSX.Element} The loading spinner component.
 */
const Loading = ({ width = 'w-6', height = 'h-6' }: LoadingProps) => (
  <div
    className={`m-2 inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${width} ${height}`}
    role="status"
  >
    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
      Loading...
    </span>
  </div>
)

export default Loading
