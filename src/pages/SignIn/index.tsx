import { useState } from 'react'

import styles from './styles.module.scss'

import { GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth'
import { auth } from '../../services/firebase'

import { GoogleLogo, SignOut } from 'phosphor-react'
import { Button } from '../../components/Button'

export function SignIn() {
  const [user, setUser] = useState<User>({} as User)
  const [isDisable, setIsDisable] = useState(true)

  function handleIfIsDisable() {
    setIsDisable(!isDisable)
  }

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)

      .then((result) => {
        setUser(result.user)
        handleIfIsDisable()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleGoogleSignOut() {
    console.log('Sair?!')
  }

  return (
    <div className={styles.container}>
      {!isDisable && (
        <div className={styles.user}>
          {user.photoURL && (
            <img
              className={styles.user__photo}
              src={user.photoURL}
              alt="Foto do usuário"
            />
          )}

          <h1 className={styles.user__name}>
            {user.displayName}
          </h1>

          <small className={styles.user__email}>
            {user.email}
          </small>

          <Button text='Sair' click={handleGoogleSignOut}>
            <SignOut />
          </Button>
        </div>
      )}
      
      {isDisable && (
        <div className={styles.home}>
          <h1 className={styles.home__title}>Acesse sua conta</h1>

          <span className={styles.home__headline}>
            Utilizando autenticação social, por exemplo, autenticação com a Google você facilita a vida do usuário permitindo utiliza sua aplicação sem fazer cadastro.
          </span>

          <Button text='Entrar com Google' click={handleGoogleSignIn}>
            <GoogleLogo />
          </Button>
        </div>
      )}
    </div>
  )
}