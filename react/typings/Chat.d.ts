export interface ItemChatProps {
    title: string;
    text: string;
    icon: string;
    colorBorder?: string;
    colorText?: string;
    link?: string;
    target?: string;
    hiddenMobile?: boolean;
}

export interface ChatProps {
    items: ItemChatProps[];
    iconChat: string;
    title: string;
    text: string;
    background?: string;
    colorText?: string;
}
    