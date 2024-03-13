import styles from "./DropdownList.module.scss";
import { Fragment, ReactElement, useEffect, useState } from "react";
import {
    DropdownListColor,
    DropdownListOption,
    DropdownListOptions,
    DropdownListOptionValue,
} from "src/ui/components/DropdownList/DropdownList.types.ts";
import { PopoverBase, PopoverBaseProps } from "src/ui/components/PopoverBase/PopoverBase.tsx";
import { Button } from "src/ui/components/Button/Button.tsx";
import { clsx } from "clsx";

interface DropdownListProps extends Pick<PopoverBaseProps, "arrowSide" | "arrowAlign"> {
    children: ReactElement;
    options: DropdownListOptions;
    onChange?: (option: DropdownListOption) => void;
    value?: DropdownListOptionValue;
    color?: DropdownListColor;
    fullWidth?: boolean;
}

export const DropdownList = (props: DropdownListProps) => {
    const { children, options, onChange, color = "accent", fullWidth }: DropdownListProps = props;
    const [show, setShow] = useState(false);
    const [value, setValue] = useState<DropdownListOptionValue>(props.value ?? null);

    useEffect(() => {
        if (props.value !== undefined) {
            setValue(props.value);
        }
    }, [props.value]);

    const handleChange = (value: DropdownListOption) => {
        setValue(value);
        setShow(false);
        value.onClick?.();
        onChange?.(value);
    };

    const renderList = () => {
        const listClassName = clsx(styles.list, styles[color]);
        return (
            <div className={listClassName}>
                {options.map((option, index) =>
                    Array.isArray(option) ? renderOptionGroup(option, index) : renderOption(option, index),
                )}
            </div>
        );
    };

    const renderOptionGroup = (optionGroup: DropdownListOption[], index: number) => {
        return (
            <Fragment key={`group-${index}`}>
                {optionGroup.map(renderOption)}
                <div className={styles.divider} />
            </Fragment>
        );
    };
    
    const renderOption = (option: DropdownListOption, index: number) => {
        return (
            <Button
                type={"tertiary"}
                color={color}
                onClick={() => handleChange(option)}
                disabled={option.value === value || option.value === null}
                align={"start"}
                key={index}
            >
                {option.name}
            </Button>
        );
    };

    return (
        <PopoverBase
            {...props}
            color={"contrast"}
            triggerEvent={"click"}
            content={renderList()}
            show={show}
            setShow={setShow}
            maxHeight={300}
            fullWidth={fullWidth}
        >
            {children}
        </PopoverBase>
    );
};
