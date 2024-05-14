export interface ImportHsProps {
  notification: { message: string; type?: string } | null
  setNotification: (notification: ImportHsNotificationProps | null) => void
}

export interface ImportHsNotificationProps {
  message: string
  type?: string
}
