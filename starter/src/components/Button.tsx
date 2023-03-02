import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

interface IButton {
    get: boolean
    set: (x: boolean) => void
}

const Button: React.FC<IButton> = ({get, set}) => {
    return (
        <button className="eye" type="button"onClick={() => set(!get)}>
            {get ? <AiFillEye /> : <AiFillEyeInvisible />}
        </button>
    )
}

export default Button