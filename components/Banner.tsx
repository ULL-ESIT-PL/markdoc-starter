import React from 'react'

export function Banner({ children, type }) {
  return (
    <section className={`banner ${type}`}>
        {children}
        <style>
          {`
            .banner {
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: 0.5rem;
            }

            .watching {
                background: #f5f5f5;
                border: 1px solid #e3e3e3;
            }
            
            .alert {
                background: #f5f5f5;
                border: 1px solid #e3e3e3;
            }`
          }
        </style>
    </section>
  )
}
