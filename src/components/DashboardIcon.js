import React from "react"
import PropTypes from "prop-types"

const DashboardIcon = ({ icon: Icon, label, onClick }) => (
    <div className='icon' onClick={onClick}>
        <Icon />
        <span>{label}</span>
    </div>
)

DashboardIcon.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.elementType,
    onClick: PropTypes.func,
}

export default DashboardIcon
