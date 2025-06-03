import React, { useEffect, useRef, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Thumbs, Navigation, Pagination } from 'swiper'
import { useCssHandles } from 'vtex.css-handles';
import './estilos.css';
/* import 'swiper/swiper-bundle.css' */

const CSS_HANDLES = [
  'container-image-pdp-variation'
] as const;

const VariationsPDP: StorefrontFunctionComponent = () => {
  const handles = useCssHandles(CSS_HANDLES);
  const productContext = useProduct()
  const prevContextRef = useRef<typeof productContext>()
  const [hasContextChanged, setHasContextChanged] = useState<boolean | null>(null)
  const messageInsertedRef = useRef<boolean>(false)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)
  const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const toggleMessage = (show: boolean) => {
    const container = document.querySelector('.vtex-store-components-3-x-skuSelectorContainer')
    const existingMessage = container?.querySelector('.size-notice-message')

    if (show && !existingMessage && container) {
      const message = document.createElement('div')
      message.className = 'size-notice-message'
      message.style.cssText = `
        margin-top: 10px;
        padding: 8px 12px;
        background-color: #fff3cd;
        border-left: 4px solid #ffc107;
        color: #856404;
      `
      message.innerHTML = '¡Recuerda! Elige el tamaño y el color (si aplica) para ver las imágenes correspondientes a tu selección.'
      container.appendChild(message)
      messageInsertedRef.current = true
    } else if (!show && existingMessage) {
      existingMessage.remove()
      messageInsertedRef.current = false
    }
  }

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (prevContextRef.current === undefined) {
      prevContextRef.current = productContext
      setHasContextChanged(null)
      toggleMessage(false)
      return
    }

    const isSameProduct = (
      prevContextRef.current?.product?.productId === productContext?.product?.productId &&
      prevContextRef.current?.selectedItem?.itemId === productContext?.selectedItem?.itemId
    )

    setHasContextChanged(!isSameProduct)
    prevContextRef.current = productContext

    toggleMessage(isSameProduct && hasContextChanged !== null)
  }, [productContext])

  useEffect(() => {
    if (hasContextChanged) {
      mainSwiper?.slideTo(0, 0)
      thumbsSwiper?.slideTo(0, 0)
    }

    if (hasContextChanged !== null) {
      toggleMessage(!hasContextChanged)
    }
  }, [hasContextChanged])

  const images = productContext?.selectedItem?.images ?? []
  const filteredImages = images.filter(image => image.imageLabel !== 'ColorPicker')

  if (!filteredImages.length) return null

  return (
    <div className={`${handles['container-image-pdp-variation']} flex`}>
      {thumbsSwiper && (
        <Swiper
          spaceBetween={2}
          slidesPerView={1}
          modules={[Thumbs, Navigation, Pagination]}
          thumbs={{ swiper: thumbsSwiper }}
          className='mySwiper2'
          onSwiper={setMainSwiper}
          style={{ marginBottom: '10px' }}
          navigation
          pagination
        >
          {filteredImages.map((image) => (
            <SwiperSlide key={image.imageId}>
              <img src={image.imageUrl} alt={image.imageLabel} style={{ width: '100%' }} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={2}
        slidesPerView={isMobile ? 4 : 4}
        watchSlidesProgress
        modules={[Thumbs]}
        className='mySwiper'
        direction={isMobile ? 'horizontal' : 'vertical'} // ✅ dirección adaptable
      >
        {filteredImages.map((image) => (
          <SwiperSlide key={image.imageId}>
            <img
              src={image.imageUrl}
              alt={image.imageLabel}
              style={{ cursor: 'pointer', width: '100%' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default VariationsPDP
