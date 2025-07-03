import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { DrawerTrigger, Drawer } from "vtex.store-drawer"

const CSS_HANDLES = [
  'container-cookies',
  'container-cookie',
  'title',
  'description',
  'toggleContainer',
  'toggleSwitch',
  'toggleSlider',
  'toggleActive',
  'toggleDisabled',
  'button',
  'buttonActive',
  'link'
] as const

const STORAGE_KEYS = {
  STORAGE: 'PreferenciasAlmacenamiento',
  ESSENTIAL: 'PreferenciasAlmacenamientoEsenciales',
  ADVERTISING: 'PreferenciasAlmacenamientoPublicidad',
  PERSONALIZATION: 'PreferenciasAlmacenamientoPersonalizacion',
  ANALYTICS: 'PreferenciasAlmacenamientoAnalitica'
}

const Cookies: StorefrontFunctionComponent<any> = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const [storageEnabled, setStorageEnabled] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true,
    advertising: false,
    personalization: false,
    analytics: false
  })

  useEffect(() => {
    setStorageEnabled(localStorage.getItem(STORAGE_KEYS.STORAGE) === 'true')
    setPreferences({
      essential: true,
      advertising: localStorage.getItem(STORAGE_KEYS.ADVERTISING) === 'true',
      personalization: localStorage.getItem(STORAGE_KEYS.PERSONALIZATION) === 'true',
      analytics: localStorage.getItem(STORAGE_KEYS.ANALYTICS) === 'true'
    })
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STORAGE, String(storageEnabled))
    localStorage.setItem(STORAGE_KEYS.ADVERTISING, String(preferences.advertising))
    localStorage.setItem(STORAGE_KEYS.PERSONALIZATION, String(preferences.personalization))
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, String(preferences.analytics))
  }, [storageEnabled, preferences])

  const handleStorageToggle = () => {
    setStorageEnabled(!storageEnabled)
  }

  const handlePreferenceToggle = (type: keyof typeof preferences) => {
    if (type === 'essential') return
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const handleSaveAll = () => {
    const overlay = document.querySelector('.rubbermaidmx-cookies-0-x-overlay--visible') as HTMLElement
    if (overlay) {
      overlay.click()
    }
  }

  return (
    <>
      <DrawerTrigger />
      <Drawer position='left'>
        <div className={`${handles['container-cookies']}`}>
          <div className={`${handles['container-cookie']}`}>
            <h1 className={`${handles['title']}`}>Preferencias de almacenamiento</h1>
            <p className={`${handles['description']}`}>
              Cuando visita sitios web, pueden almacenar o recuperar datos sobre usted utilizando cookies
              y tecnologías similares ("cookies"). Las cookies pueden ser necesarias para la funcionalidad
              básica del sitio web, así como para otros fines. Tiene la opción de deshabilitar ciertos tipos
              de cookies, aunque hacerlo puede afectar su experiencia en el sitio web.
              <a href="/privacidad" className={`${handles['link']}`}>Política de cookies</a>
            </p>

            <div className={`${handles['toggleContainer']}`}>
              <label className={`${handles['toggleSwitch']}`}>
                <input
                  type="checkbox"
                  checked={storageEnabled}
                  onChange={handleStorageToggle}
                />
                <span className={`${handles['toggleSlider']} ${storageEnabled ? handles['toggleActive'] : ''}`} />
              </label>
            </div>
          </div>

          <div className={`${handles['container-cookie']}`}>
            <h2 className={`${handles['title']}`}>Esenciales</h2>
            <p className={`${handles['description']}`}>
              Necesario para habilitar la funcionalidad básica del sitio web. No puede deshabilitar las cookies esenciales.
              <a href="/privacidad" className={`${handles['link']}`}>Ver Cookies</a>
            </p>
            <div className={`${handles['toggleContainer']}`}>
              <label className={`${handles['toggleSwitch']} ${handles['toggleDisabled']}`}>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  readOnly
                />
                <span className={`${handles['toggleSlider']} ${handles['toggleActive']}`} />
              </label>
            </div>
          </div>

          <div className={`${handles['container-cookie']}`}>
            <h2 className={`${handles['title']}`}>Publicidad Dirigida</h2>
            <p className={`${handles['description']}`}>
              Se utiliza para ofrecer publicidad que sea más relevante para usted y sus intereses.
              <a href="/privacidad" className={`${handles['link']}`}>Ver cookies</a>
            </p>
            <div className={`${handles['toggleContainer']}`}>
              <label className={`${handles['toggleSwitch']}`}>
                <input
                  type="checkbox"
                  checked={preferences.advertising}
                  onChange={() => handlePreferenceToggle('advertising')}
                />
                <span className={`${handles['toggleSlider']} ${preferences.advertising ? handles['toggleActive'] : ''}`} />
              </label>
            </div>
          </div>

          <div className={`${handles['container-cookie']}`}>
            <h2 className={`${handles['title']}`}>Personalización</h2>
            <p className={`${handles['description']}`}>
              Permita que el sitio web recuerde las elecciones que realiza.
              <a href="/privacidad" className={`${handles['link']}`}>Ver cookies</a>
            </p>
            <div className={`${handles['toggleContainer']}`}>
              <label className={`${handles['toggleSwitch']}`}>
                <input
                  type="checkbox"
                  checked={preferences.personalization}
                  onChange={() => handlePreferenceToggle('personalization')}
                />
                <span className={`${handles['toggleSlider']} ${preferences.personalization ? handles['toggleActive'] : ''}`} />
              </label>
            </div>
          </div>

          <div className={`${handles['container-cookie']}`}>
            <h2 className={`${handles['title']}`}>Analítica</h2>
            <p className={`${handles['description']}`}>
              Ayude al operador del sitio web a comprender cómo funciona su sitio web.
              <a href="/privacidad" className={`${handles['link']}`}>Ver cookies</a>
            </p>
            <div className={`${handles['toggleContainer']}`}>
              <label className={`${handles['toggleSwitch']}`}>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => handlePreferenceToggle('analytics')}
                />
                <span className={`${handles['toggleSlider']} ${preferences.analytics ? handles['toggleActive'] : ''}`} />
              </label>
            </div>
          </div>

          <button
            className={`${handles['button']} ${storageEnabled ? handles['buttonActive'] : ''}`}
            onClick={handleSaveAll}
          >
            {storageEnabled ? 'Guardar' : 'Guardar'}
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default Cookies