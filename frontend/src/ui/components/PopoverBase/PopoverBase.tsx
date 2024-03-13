import styles from "./PopoverBase.module.scss";
import {
    cloneElement,
    ReactElement,
    ReactNode,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import {
    PopoverArrowAlign,
    PopoverArrowSide,
    PopoverColor,
    PopoverTrigger,
} from "./PopoverBase.types.ts";
import { clsx } from "clsx";
import { createPortal } from "react-dom";

export interface PopoverBaseProps {
    children: ReactElement;
    content: ReactNode;
    triggerEvent: PopoverTrigger;
    color?: PopoverColor;
    arrowSide?: PopoverArrowSide;
    arrowAlign?: PopoverArrowAlign;
    delay?: number;
    maxWidth?: number;
    maxHeight?: number;
    show?: boolean;
    width?: number;
    setShow?: (show: boolean) => void;
    fullWidth?: boolean;
}

const POPOVER_MARGIN = 4;
const ARROW_MARGIN = 16;
const ARROW_WIDTH = 12;

export const PopoverBase = (props: PopoverBaseProps) => {
    const {
        children,
        content,
        triggerEvent,
        color = "accent",
        arrowSide,
        arrowAlign,
        delay,
        maxWidth,
        fullWidth,
        maxHeight,
    }: PopoverBaseProps = props;
    const childrenRef = useRef<HTMLElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    const [position, setPosition] = useState<{
        left?: number;
        top?: number;
    }>({});
    const delayTimeoutRef = useRef<NodeJS.Timeout>();

    useLayoutEffect(() => {
        setShow(props.show ?? show);
    }, [props.show]);

    useEffect(() => {
        props.setShow?.(show);
    }, [show]);

    useEffect(() => {
        const childrenElement = childrenRef.current;
        if (!childrenElement) {
            return;
        }
        const cleanup = initializeEventListeners(childrenElement);
        return () => cleanup();
    }, [show]);

    useLayoutEffect(() => {
        calcPosition();
    }, [show]);

    const initializeEventListeners = (element: HTMLElement) => {
        if (triggerEvent === "click") {
            element.addEventListener("click", handleMouseClick);
            element.addEventListener("input", handleInput);
            document.addEventListener("click", handleDocumentClick);
            if (show) {
                document.addEventListener("scroll", handleWindowScroll, true);
                window.addEventListener("resize", handleWindowResize);
            }
        }
        if (triggerEvent === "hover") {
            element.addEventListener("mouseenter", handleMouseEnter);
            element.addEventListener("mouseleave", handleMouseLeave);
        }
        return () => {
            element.removeEventListener("click", handleMouseClick);
            element.removeEventListener("mouseenter", handleMouseEnter);
            element.removeEventListener("mouseleave", handleMouseLeave);
            element.removeEventListener("input", handleInput);
            document.removeEventListener("scroll", handleWindowScroll);
            window.removeEventListener("resize", handleWindowResize);
            document.removeEventListener("click", handleDocumentClick);
        };
    };

    const calcPosition = () => {
        const childrenElement = childrenRef.current!;
        const popoverElement = popoverRef.current!;
        if (!childrenElement || !popoverElement) {
            return;
        }
        const childrenRect = childrenElement.getBoundingClientRect();
        const childrenWidth = childrenRect.width;
        const childrenHeight = childrenRect.height;
        const popoverHeight = popoverElement.clientHeight;
        const popoverWidth = popoverElement.clientWidth;
        const arrowSide = getArrowSide();

        let offsetY = 0;
        let offsetX = 0;

        if (arrowSide === "top") {
            offsetX = getPositionOffset(childrenWidth, popoverWidth);
            offsetY = childrenHeight + POPOVER_MARGIN;
        }
        if (arrowSide === "bottom") {
            offsetX = getPositionOffset(childrenWidth, popoverWidth);
            offsetY = -popoverHeight - POPOVER_MARGIN;
        }
        if (arrowSide === "left") {
            offsetX = childrenWidth + POPOVER_MARGIN;
            offsetY = getPositionOffset(childrenHeight, popoverHeight);
        }
        if (arrowSide === "right") {
            offsetX = -popoverWidth - POPOVER_MARGIN;
            offsetY = getPositionOffset(childrenHeight, popoverHeight);
        }

        setPosition({
            left: childrenRect.x + offsetX,
            top: childrenRect.y + offsetY,
        });
    };

    const getPositionOffset = (childrenSize: number, popoverSize: number) => {
        const arrowAlign = getArrowAlign();
        let offset = childrenSize / 2;
        if (arrowAlign === "start") {
            offset -= ARROW_MARGIN + ARROW_WIDTH / 2;
        }
        if (arrowAlign === "center") {
            offset -= popoverSize / 2;
        }
        if (arrowAlign === "end") {
            offset -= popoverSize - ARROW_MARGIN - ARROW_WIDTH / 2;
        }
        return offset;
    };

    const handleInput = () => {
        setTimeout(() => {
            setShow(true);
        }, 100);
    };

    const handleMouseClick = () => {
        setShow((show) => !show);
    };

    const handleWindowScroll = () => {
        calcPosition();
    };

    const handleWindowResize = () => {
        calcPosition();
    };

    const handleDocumentClick = (event: MouseEvent) => {
        if (!show) {
            return;
        }
        const target = event.target;
        if (
            target instanceof Node &&
            [childrenRef, popoverRef].some((ref) => ref.current?.contains(target))
        ) {
            return;
        }
        setShow(false);
    };

    const handleMouseEnter = () => {
        if (delay) {
            clearTimeout(delayTimeoutRef.current);
            delayTimeoutRef.current = setTimeout(() => {
                setShow(true);
            }, delay);
        } else {
            setShow(true);
        }
    };

    const handleMouseLeave = () => {
        clearTimeout(delayTimeoutRef.current);
        setShow(false);
    };

    const getArrowSide = (): PopoverArrowSide => {
        if (arrowSide) {
            return arrowSide;
        }
        return "top";
    };

    const getArrowAlign = (): PopoverArrowAlign => {
        if (arrowAlign) {
            return arrowAlign;
        }
        return "center";
    };

    const renderContent = () => {
        const arrowSide = getArrowSide();
        const arrowAlign = getArrowAlign();
        const popoverClassName = clsx(
            styles.popover,
            styles[color],
            styles[arrowSide],
            styles[arrowAlign],
        );
        const arrowClassName = clsx(styles.arrow, styles[arrowSide]);
        const width = fullWidth && childrenRef.current?.clientWidth;
        return createPortal(
            <div
                ref={popoverRef}
                className={popoverClassName}
                style={{
                    ...position,
                    width: width ? `${width}px` : undefined,
                }}
            >
                <div className={arrowClassName} />
                <div
                    className={clsx(styles.card, styles[color])}
                    style={{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` }}
                >
                    {content}
                </div>
            </div>,
            document.body,
        );
    };

    return (
        <>
            {cloneElement(children, { ref: childrenRef })}
            {show && renderContent()}
        </>
    );
};
