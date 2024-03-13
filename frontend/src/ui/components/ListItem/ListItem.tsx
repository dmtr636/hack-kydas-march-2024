import styles from "./ListItem.module.scss";
import { Checkbox } from "src/ui/components/Checkbox/Checkbox.tsx";

interface ListItemProps {
    title: string;
    subtitle: string;
}

export const ListItem = (props: ListItemProps) => {
    const { title, subtitle }: ListItemProps = props;

    return (
        <div className={styles.listItem}>
            <Checkbox onChange={() => {}} title={title} subtitle={subtitle} />
        </div>
    );
};
