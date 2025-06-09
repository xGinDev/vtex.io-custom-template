import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles';
import { ChatProps } from '../../typings/Chat';
import './styles.css';

const CSS_HANDLES = [
  'container-chat',
  'container-icon',
  'container-text-icon',
  'title',
  'text',
  'icon',
  'container-items',
  'container-item',
  'container-item-text',
  'title-item',
  'text-item',
  'icon-item',
  'hidden-mobile'
] as const;

const Chat: StorefrontFunctionComponent<ChatProps> = ({
  title,
  text,
  iconChat,
  background,
  colorText,
  items
}) => {
  const handles = useCssHandles(CSS_HANDLES);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const chatHover = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`${handles['container-chat']}`}>
      {isOpen && (
        <div className={`${handles['container-items']}`}>
          {items?.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target={item.target}
              rel="noopener noreferrer"
              className={`${handles['container-item']} ${item.hiddenMobile ? `${handles['hidden-mobile']}` : ''}`}
              style={{
                animationDelay: `${index * 0.1}s`,
                border: `1px solid ${item.colorBorder}`,
                color: item.colorText,
              }}
            >
              <div className={`${handles['container-item-text']}`}>
                <p className={`${handles['title-item']} b ma0`} style={{ color: item.colorText }}>{item.title}</p>
                <p className={`${handles['text-item']} ma0`} style={{ color: item.colorText }}>{item.text}</p>
              </div>
              <img src={item.icon} alt="Icon" className={`${handles['icon-item']}`} />
            </a>

          ))}
        </div>
      )}
      <div
        className={`${handles['container-icon']} flex items-center`}
        style={{ backgroundColor: background }}
        onClick={chatHover}
      >
        <div className={`${handles['container-text-icon']}`}>
          <p className={`${handles['title']} b ma0`} style={{ color: colorText }}>{title}</p>
          <p className={`${handles['text']} ma0`} style={{ color: colorText }}>{text}</p>
        </div>
        <img
          src={isOpen ? 'https://alfagresalfa.vteximg.com.br/arquivos/Dismiss.svg' : iconChat}
          alt="Icon Chat"
          className={`${handles['icon']}`}
        />
      </div>
    </div>
  )
}

Chat.defaultProps = {
  title: '¡Hola!',
  text: 'Obtén ayuda aquí',
  iconChat: 'https://alfagresalfa.vteximg.com.br/arquivos/Chat.svg',
  background: '#CC3E00',
  colorText: '#FFFFFF',
  items: [
    {
      title: 'Alfabot',
      text: 'Obtén asistencia aquí, sin abandonar esta página.',
      icon: 'https://alfagresalfa.vteximg.com.br/arquivos/LogoA.png',
      colorBorder: '#FF4D00',
      colorText: '#000000',
      link: '#',
      target: '_blank',
      hiddenMobile: true,
    },
    {
      title: 'Línea Naranja',
      text: 'Chatea desde la app y recibe asesoría especializada.',
      icon: 'https://alfagresalfa.vteximg.com.br/arquivos/Logo.png',
      colorBorder: '#00D95F',
      colorText: '#000000',
      link: '#',
      target: '_blank',
    },
  ],
}

Chat.schema = {
  title: 'Chat',
  description: 'Chat con botones flotantes',
  type: 'object',
  properties: {
    title: {
      title: 'Title',
      type: 'string',
    },
    text: {
      title: 'Text',
      type: 'string',
    },
    iconChat: {
      title: 'Icon Chat',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    background: {
      title: 'Background',
      type: 'string',
      widget: {
        'ui:widget': 'color',
      },
    },
    colorText: {
      title: 'Color Text',
      type: 'string',
      widget: {
        'ui:widget': 'color',
      },
    },
    items: {
      title: 'Items',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { title: 'Title', type: 'string' },
          text: { title: 'Text', type: 'string' },
          icon: {
            title: 'Icon',
            type: 'string',
            widget: { 'ui:widget': 'image-uploader' },
          },
          colorBorder: {
            title: 'Color Border',
            type: 'string',
            widget: { 'ui:widget': 'color' },
          },
          colorText: {
            title: 'Color Text',
            type: 'string',
            widget: { 'ui:widget': 'color' },
          },
          link: { title: 'Link', type: 'string' },
          target: { title: 'Target', type: 'string' },
        },
      },
    },
  }
}

export default Chat
