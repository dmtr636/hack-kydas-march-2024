import styles from "./Avatar.module.scss";
import { DropdownListOptions } from "src/ui/components/DropdownList/DropdownList.types.ts";
import { DropdownList } from "src/ui/components/DropdownList/DropdownList.tsx";
import { clsx } from "clsx";
import { IconUserRounded } from "src/ui/assets/icons";

interface AvatarProps {
    userName?: string;
    menuItems?: DropdownListOptions;
    photoUrl?: string;
    size?: "small" | "large";
}

export const Avatar = (props: AvatarProps) => {
    const { userName, menuItems, photoUrl, size = "small" }: AvatarProps = props;

    const initials = userName
        ?.split(" ")
        .map((n) => n[0].toUpperCase())
        .join("");

    const renderAvatar = () => (
        <button className={clsx(styles.avatar, styles[size])} disabled={!menuItems?.length}>
            {photoUrl ? (
                <img src={photoUrl} alt={"Аватар"} />
            ) : (
                initials ?? <IconUserRounded className={styles.icon} />
            )}
        </button>
    );

    if (!menuItems?.length) {
        return renderAvatar();
    }

    return (
        <DropdownList options={menuItems} color={"neutral"} arrowAlign={"end"}>
            {renderAvatar()}
        </DropdownList>
    );
};
