import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content level">
          <section className="level-item has-text-centered menu">
            <ul className="menu-list">
              {[
                {to: '/', name:'Home'},
                {to: '/blog', name:'Indicações'},
                {to: '/about', name:'Espaço LuzJo'},
                {to: '/contact', name:'Contato'}
              ].map(item => (
                <li>
                  <Link to={item.to} className="navbar-item">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  className="navbar-item"
                  href="/admin/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Admin
                </a>
              </li>
            </ul>
          </section>
          <div className="level level-item ">
            <img
              src={logo}
              alt="LuzJo"
              className="level-item has-text-centered"
              style={{
                width: '14em',
                height: '10em',
                filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(50deg) brightness(105%) contrast(101%)',
              }}
            />
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
