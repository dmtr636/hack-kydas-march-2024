import { useState } from "react";
import styles from "./styles.module.scss";
import { LoginForm } from "../LoginForm/LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { store } from "src/app/stores/AppStore";
import { LOGIN_ENDPOINT } from "src/shared/api/endpoints.ts";
import logo from 'src/ui/assets/logo.svg'
import BG from 'src/ui/assets/BG.png'

export const LoginPage = () => {
    const [emailValue, setEmailValue] = useState("");
    const [passValue, setPassValue] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorCount, setErrorCount] = useState(6);
    const [blockTimeCount, setblockTimeCount] = useState();
    const [blockButton, setBlockbutton] = useState(false);
    const [error, setError] = useState(false);
    /*     const [user, setUser] = useState({});
     */
    const navigate = useNavigate();

    function getMinutesWord(minutes: number) {
        const lastDigit = minutes % 10;
        const lastTwoDigits = minutes % 100;

        if (lastDigit === 1 && lastTwoDigits !== 11) {
            return "минута";
        } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
            return "минуты";
        } else {
            return "минут";
        }
    }

    const alertText = () => {
        if (blockTimeCount) {
            return `Блокировка: ${Math.trunc(blockTimeCount / 60)} 
            ${getMinutesWord(Math.trunc(blockTimeCount / 60))}`;
        }
        if (errorCount <= 3) {
            return `Осталось ${errorCount} ${errorCount == 1 ? `попытка` : `попытки`}`;
        }
        return "";
    };
    const titleAlertText = () => {
        if (blockTimeCount) {
            return `Попробуйте повторить позже`;
        } else return "Неправильные почта или пароль";
    };

    const data = {
        email: emailValue,
        password: passValue,
        rememberMe: isChecked,
    };
    const blockButtonTimeout = (blockTimeCount: number) => {
        setBlockbutton(true);
        setTimeout(() => {
            setBlockbutton(false);
            setErrorCount(6);
        }, blockTimeCount * 1000);
    };

    const onClickEnter = () => {
        setError(false);
        axios
            .post(LOGIN_ENDPOINT, data, { withCredentials: true })
            .then((response) => {
                setError(false);
                setShowAlert(false);

/*                 setUser(response.data);
 */                setErrorCount(6);

                store.user.setUser(response.data);
                navigate("/");
            })
            .catch((error) => {
                setShowAlert(true);
                setError(true);
                setErrorCount(error.response.data.error.data.remainingAttempts);
                if (error.response.data.error.data?.retryDelaySeconds) {
                    setblockTimeCount(error.response.data.error.data?.retryDelaySeconds);
                    blockButtonTimeout(error.response.data.error.data?.retryDelaySeconds);
                }
                alertText();
            });
    };

    return (
        <div className={styles.body}>
            <div className={styles.leftside}>
                <div className={styles.header}><img src={logo} alt="" /></div>
                <div className={styles.img}> <img className={styles.image} src={BG} alt="" /></div>
            </div>
            <div className={styles.rightside}>
                <LoginForm
                    email={emailValue}
                    password={passValue}
                    onChangeChecked={setIsChecked}
                    isChecked={isChecked}
                    showAlert={showAlert}
                    onChangeEmail={setEmailValue}
                    onChangePassword={setPassValue}
                    logo={"Личный кабинет"}
                    error={error}
                    recover={false}
                    blockButton={blockButton}
                    subtitleAlertext={alertText}
                    onClickEnter={onClickEnter}
                    titleAlertText={titleAlertText}
                />
            </div>
        </div>
    );
};
