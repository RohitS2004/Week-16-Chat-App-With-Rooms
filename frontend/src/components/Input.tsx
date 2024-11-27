import { forwardRef } from "react";

type FontSize = "sm" | "md" | "lg" | "xl";
type FontColor = "black" | "white" | "slate";
type BackgroundColor = "black" | "white" | "transparent";

interface InputProps {
    labelText?: String;
    labelFontSize?: String;
    labelFontColor?: String;
    labelFontWeight?: String;
    inputType: String;
    inputPlaceholder: string;
    inputFontSize: FontSize;
    inputFontColor: FontColor;
    inputPadding: String;
    inputBorderRadius: String;
    inputWidth: String;
    inputBackgroundColor: BackgroundColor;
    inputClasses: String;
    flexProperties: String;
    inputName: string;
    onChange?:(e: any) => void;
}

const FontSize = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
}

const FontColor = {
    black: "text-black",
    white: "text-white",
    slate: "text-slate-500",
}

const BackgroundColor = {
    black: "bg-black",
    white: "bg-white",
    transparent: "bg-transparent",
}

const Input = (props: InputProps, ref: any) => {
    return (
        <div
        className={`${props.flexProperties}`}
        >
            <label 
            htmlFor={props.inputName}
            className={`
                ${props.labelFontColor}
                ${props.labelFontSize}
                ${props.labelFontWeight}
                `}
            >
                {props.labelText}
            </label>
            <input 
            type="text" 
            placeholder={props.inputPlaceholder}
            name={props.inputName}
            className={`
                ${FontSize[props.inputFontSize]}
                ${FontColor[props.inputFontColor]}
                ${props.inputPadding}
                ${props.inputBorderRadius}
                ${props.inputWidth}
                ${BackgroundColor[props.inputBackgroundColor]}
                ${props.inputClasses}
                outline-none
                `}
                ref={ref}
                onChange={props.onChange}
            />
        </div>
    )
}

export default forwardRef(Input);