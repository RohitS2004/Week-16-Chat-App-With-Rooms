type BackgroundColor = "white" | "blue" | "green";
type FontColor = "black" | "white";
type FontSize = "sm" | "md" | "lg" | "xl";

interface Message {
    message: String;
    padding: String;
    backgroundColor: BackgroundColor;
    fontColor: FontColor;
    borderRadius: String;
    fontSize: FontSize;
    textAlign: String;
    classes: String;
    sender?: String;
    justify?: String;
}

const BackgroundColor = {
    white: "bg-white",
    blue: "bg-blue-400",
    green: "bg-green-400",
};
const FontColor = {
    black: "text-black",
    white: "text-white",
};
const FontSize = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
};

const Message = (props: Message) => {
    return (
        <div
            className={`
                flex ${props.justify} w-full
            `}
        >
            <div
                className={`
                    ${BackgroundColor[props.backgroundColor]}
                    ${FontSize[props.fontSize]}
                    ${FontColor[props.fontColor]}
                    ${props.padding}
                    ${props.borderRadius}
                    ${props.textAlign}
                    ${props.classes}
                `}
            >
                <span
                    className={`
                    text-xs font-semibold
                    `}
                >
                    {props.sender && props.sender}
                </span>
                <span>{props.message}</span>
            </div>
        </div>
    );
};

export default Message;
