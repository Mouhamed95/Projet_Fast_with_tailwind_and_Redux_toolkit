import { Link } from "react-router-dom"

function Button({children,disabled,to,type}) {
 
 const base = "focus:ring-offset-2 text-sm focus:ring-yellow-300 focus:ring focus:bg-yellow-300 focus:outline-none transition-colors duration-300  bg-yellow-400 uppercase font-semibold text-stone-800  inline-block tracking-wide rounded-full hover:bg-yellow-300 "
 const styles = {
    primary: base + "px-4 py-3 md:px-6 md:py-4",
    small: base + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary: "focus:ring-offset-2 text-sm px-4 py-2.5 md:px-6 md:py-3.5 focus:ring-yellow-300 focus:ring-stone-200 focus:bg-stone-300 focus:outline-none transition-colors duration-300 border-2 border-stone-300 uppercase font-semibold text-stone-400  inline-block tracking-wide rounded-full hover:bg-stone-300 focus:text-stone-800 "
    
 }
 
    if(to) return  <Link to={to} className={styles[type]}>{children}</Link>
   
    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
}

export default Button
