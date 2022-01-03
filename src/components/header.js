import PropTypes from "prop-types"
import React from "react"
import favicon from "../images/brand/favicon.png"
import nucleo from "../styles/vendor/nucleo/css/nucleo.css"
import fontawesome from "../styles/vendor/@fortawesome/fontawesome-free/css/all.min.css"

const Header = ({ siteTitle }) => (
  <header>
    <link rel="icon" href={favicon} type="image/png" />
    <title>{siteTitle}</title>
    <link href="//cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href={nucleo} type="text/css" />
    <link rel="stylesheet" href={fontawesome} type="text/css" />
    <link
      href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css"
      rel="stylesheet"
    />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
