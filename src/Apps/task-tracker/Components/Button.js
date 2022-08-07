import PropTypes from 'prop-types'

export const Button = ({
    color, text, onClick
}) => {

    return(
        <button
        onClick={onClick}
        style={{backgroundColor: color}}>
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: 'rgb(33, 155, 19)'
}

Button.protoTypes = {
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
}