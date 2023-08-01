export interface card {
    link: string
    image: string
    alt: string
    textCard: string,
    textBtn: string,
    bgCard: string
    bgBtn: string
    colorText: string
    colorTextBtn: string
}

export type Card = card[]

export interface Props {
    cardsCustom: Card
    title: string
    bgTitle: string
    bgContainer: string
    colorTitle: string
    isActive: boolean
}

export interface cardProps {
    data: Card
}