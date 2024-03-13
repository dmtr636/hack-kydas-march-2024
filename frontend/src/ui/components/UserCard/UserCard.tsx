import { Avatar } from "../Avatar/Avatar";
import styles from "./UserCard.module.scss";

interface UserCardProps {
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
}

export const UserCard = (props: UserCardProps) => {
    const { email, firstName, lastName, role }: UserCardProps = props;

    const emailLogin = email.split("@")[0];

    return (
        <div className={styles.card}>
            <Avatar userName={firstName && `${firstName} ${lastName}`} size={"large"} />
            <div>
                <div className={styles.mainInfo}>
                    <div className={styles.name}>
                        {firstName && lastName ? (
                            <>
                                <div>{firstName}</div>
                                <div>{lastName}</div>
                            </>
                        ) : (
                            <div>{emailLogin}</div>
                        )}
                    </div>
                    <div className={styles.role}>{role}</div>
                </div>
                <div className={styles.email}>{email}</div>
            </div>
        </div>
    );
};
