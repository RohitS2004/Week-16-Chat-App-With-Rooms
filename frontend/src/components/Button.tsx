import { ReactElement } from "react";

type FontSize = "sm" | "md" | "lg" | "xl";
type FontColor = "white" | "black";
type BackgroundColor = "white" | "black" | "green" | "orange" | "blue";

interface ButtonProps {
    buttonText?: String;
    buttonRadius: String;
    buttonPadding: String;
    buttonFontSize: FontSize;
    buttonFontColor: FontColor;
    buttonBackgroundColor: BackgroundColor;
    classes?: String;
    onHoverStyle: String;
    onActiveStyle: String;
    onClick: () => void;
    icon?: ReactElement;
}

const FontSizeMap = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
};

const FontColorMap = {
    white: "text-white",
    black: "text-black",
};

const BackgroundColor = {
    white: "bg-white",
    black: "bg-black",
    green: "bg-green-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
};

const Button = (props: ButtonProps) => {
    return (
        <button
        onClick={props.onClick}
        className={`
            ${props.buttonRadius}
            ${props.buttonPadding}
            ${FontSizeMap[props.buttonFontSize]}
            ${FontColorMap[props.buttonFontColor]}
            ${BackgroundColor[props.buttonBackgroundColor]}
            ${props.classes}
            ${props.onHoverStyle}
            ${props.onActiveStyle}
            `}
        >
            {props.buttonText ? props.buttonText : props.icon}
        </button>
    )
}

export default Button;