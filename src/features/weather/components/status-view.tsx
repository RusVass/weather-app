import type { ReactElement } from 'react'
import './status-view.css'

interface StatusViewProps {
  title: string
  message: string
}

export const StatusView = ({ title, message }: StatusViewProps): ReactElement => {
  return (
    <section className="status-view" aria-live="polite">
      <h2 className="status-view__title">{title}</h2>
      <p className="status-view__message">{message}</p>
    </section>
  )
}
