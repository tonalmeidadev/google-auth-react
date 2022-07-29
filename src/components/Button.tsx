import styles from './styles.module.scss'

interface ButtonProps {
  text: string
  children: React.ReactNode
  click(): void
}

export function Button(props: ButtonProps) {
  return (
    <button type='button' className={styles.button} onClick={props.click}>
      {props.children}
      {props.text}
    </button>
  )
}