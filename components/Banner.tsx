import React from 'react'

export function Banner({ children, type }) {
  return (
    <section className={`banner ${type}`}>
        <b>{type}</b><br/>
        {children}
        <style>
          {`
            .banner {
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: 0.5rem;
            }

            .warning {
                background: /* orange */ #ff9800;
                color: /* white */ #ffffff;
                border: 1px solid #e3e3e3;
            }
            
            .alert {
                background: /* purple */ #9c27b0;
                border: 1px solid #e3e3e3;
                color: /* white */ #ffffff;
            }`
          }
        </style>
    </section>
  )
}
