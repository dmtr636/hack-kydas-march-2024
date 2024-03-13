import styles from "./Link.module.scss";
import { IconArrowTopRight } from "src/ui/assets/icons";
import { clsx } from "clsx";
import { LinkSize } from "./Link.types.ts";

interface LinkProps {
    href: string;
    firstLine: string;
    secondLine?: string;
    size?: LinkSize;
}

export const Link = (props: LinkProps) => {
    const { href, firstLine, secondLine, size = "small" }: LinkProps = props;
    const linkClassName = clsx(styles.link, styles[size]);

    return (
        <a className={linkClassName} href={href} target={"_blank"} rel="noreferrer">
            <div className={styles.lines}>
                <div className={styles.line}>
                    <div className={styles.text}>{firstLine}</div>
                    {!secondLine && <IconArrowTopRight className={styles.icon} />}
                </div>
                {secondLine && (
                    <div className={styles.line}>
                        <div className={styles.text}>{secondLine}</div>
                        <IconArrowTopRight className={styles.icon} />
                    </div>
                )}
            </div>
            <div className={styles.overlay} />
        </a>
    );
};
