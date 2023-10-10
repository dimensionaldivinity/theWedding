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
        if (phrase === "dil")
        {router.push('/guestlist')}
        else {
        window.alert("too tough?")
        }


    }

    return (
        <div className="header-wrapper">
          <header className="header">
            <div className="header__hero">
              <div className="header__hero--heading">
              <span className="header__hero--heading-gradient">
                  Sharabi{" "}
                </span>
                <br />
                <div>yeh</div>
                <br />
            
              <form onSubmit={submit}>
              <div className='group'>
            <input
                name="phrase"
                type="text"
                onChange={event => setPhrase(event.target.value)}
                value={phrase}
            />
           </div>
            {/* <button onClick={forL}>Submit</button> */}
        </form>
               
               
                 <br />
                <span>ho gaya</span>
                <span className="header__hero--heading-gradient">
                   ! {" "}
                </span>
                <br />
                <span></span>
                <button className="btn-custom" onClick={forL}>Show me the Money</button>
              </div>
              
            </div>
          </header>
          
        </div>
    )
}





