import Header from "@/app/components/header";
import Link from "next/link";
import styles from "./ChooseLogin.module.scss"; // ou o nome que você preferir

export default function ChooseLogin() {
  return (
    <>
      <Header />
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Selecione o tipo de login</h1>
        
        <div className={styles.buttonsContainer}>
          <Link href="/loginCliente" className={styles.loginButton}>
            Login Cliente
          </Link>
          
          <Link href="/loginFuncionario" className={styles.loginButton}>
            Login Funcionário
          </Link>
          
          <Link href="/loginAdmin" className={styles.loginButton}>
            Login Administrador
          </Link>
        </div>
      </div>
    </>
  );
}