import { Link } from "react-router-dom"

export default function LinkButton ({ name, color, height, width, bgColor, href }) {
    return (
    <Link className="" to={href} >
        {name}
    </Link>
)
} 