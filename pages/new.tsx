// @ts-nocheck
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function App() {
    const [phrase, setPhrase] = useState('')
    

    const submit = e => {
        e.preventDefault()
        console.log(phrase)
    }
    const router = useRouter();

    const forL  = e => {
        if (phrase === "gulabi" || "Gulabi")
        {router.push('/new2')}
        else {
        window.alert("try again")
        }


    }

    return (
        <div className="header-wrapper">
          <header className="header">
            <div className="header__hero">
              <div className="header__hero--heading">
              <form onSubmit={submit}>
              <div className='group'>
            <input
                name="phrase"
                type="text"
                onChange={event => setPhrase(event.target.value)}
                value={phrase}
            />
           </div>
           {/* branching this */}
            {/* <button onClick={forL}>Submit</button> */}
        </form>
               
                <span className="header__hero--heading-gradient">
                  ankhein{" "}
                </span>
                 <br />
                <span>jo teri Dekhi</span>
                <span className="header__hero--heading-gradient">
                  ....{" "}
                </span>
                <br />
                <span></span>
                <button className="btn-custom" onClick={forL}>yeah i got it</button>
              </div>
              
            </div>
          </header>
          
        </div>
    )
}





