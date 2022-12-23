import ErrorBoundary from "../errorBoundary/ErrorBoundry";
import './style.scss'

const Login = ({onLogin}) => {
    const login = (e)=>{
       e.preventDefault()
        onLogin()
    }
    return (
        <main>
            <div className="container">
                <ErrorBoundary>
                    <form>
                        <input className="login__input" type="text" placeholder="Имя"/>
                        <input className="login__input" type="email" placeholder="E-mail"/>
                        <button className="login__btn" onClick={login}>Войти</button>
                    </form>
                </ErrorBoundary>
            </div>
        </main>
    )
}
export default Login