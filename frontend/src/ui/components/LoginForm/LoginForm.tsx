import { ReactNode } from "react";
import styles from "./style.module.scss";
import { EmailInput } from "../EmailInput/EmailInput";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { Checkbox } from "../Checkbox/Checkbox";
import { Button } from "../Button/Button";
import { Alert } from "../Alert/Alert";
import { IconAttention } from "src/ui/assets/icons";

interface loginFormProps {
    logo: ReactNode | string;
    email: string;
    password: string;
    isChecked: boolean;
    onChangeEmail: (email: string) => void;
    onChangePassword: (pass: string) => void;
    onChangeChecked: (isChecked: boolean) => void;
    onClickEnter: () => void;
    recover?: boolean;
    onClickRecover?: () => void;
    showAlert: boolean;
    subtitleAlertext: () => string | string;
    titleAlertText: () => string | string;
    error: boolean;
    blockButton?: boolean;
}

export const LoginForm = ({
    logo,
    email,
    password,
    isChecked,
    onChangeEmail,
    onChangePassword,
    onClickEnter,
    onClickRecover,
    onChangeChecked,
    recover = true,
    subtitleAlertext,
    showAlert = false,
    error,
    blockButton,
    titleAlertText,
}: loginFormProps) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const disabledButton = !(password && emailRegex.test(email.trim()));
    return (
        <div className={styles.container}>
            <div className={styles.logo}>{logo} </div>
            <div className={styles.inputs}>
                <EmailInput value={email} onChange={onChangeEmail} error={error} />
                <PasswordInput value={password} onChange={onChangePassword} error={error} />
            </div>
            <div className={styles.checkbox}>
                <Checkbox title="Запомнить меня" checked={isChecked} onChange={onChangeChecked} />
            </div>
            {showAlert && (
                <div className={styles.alert}>
                    <Alert
                        mode="negative"
                        title={titleAlertText()}
                        subtitle={subtitleAlertext()}
                        icon={<IconAttention />}
                    />
                </div>
            )}
            <div className={styles.buttonsBLock}>
                <div className={styles.enterButton}>
                    <Button
                        disabled={blockButton || disabledButton}
                        onClick={onClickEnter}
                        type="primary"
                        size="large"
                        color="accent"
                    >
                        Войти
                    </Button>
                </div>

                {recover && (
                    <div className={styles.recoverButton}>
                        <Button
                            onClick={onClickRecover}
                            type="tertiary"
                            size="large"
                            color="accent"
                        >
                            Восстановить пароль
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
