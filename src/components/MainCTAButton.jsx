import {Query} from 'react-apollo';
import gql from 'graphql-tag';

function MainCTAButton({text,onClick,className,isActive}) {
    const DEFAULT_COLOR = 'lightblue';
    return (
        <Query
            query={gql `{
                generalSettings {
                    mainCtaBtnColor
                }
            }`}
            pollInterval={5000}
        >
            {({loading,error,data})=>{
                if(loading || error) {
                    if(error) {
                        console.log(error.message);
                    }
                    return  (
                        <button 
                        className={`o_mainCTAButton ${className} ${isActive ? 'active' : 'not-active'}`} 
                        onClick={() => {
                            if(isActive) {
                                return onClick()
                            }
                        }}
                        type="button"
                       >
                           {text}
                       <style jsx>{`
                           border: none;
                           font: inherit;
                           color: inherit;
                           background-color: ${DEFAULT_COLOR};
                           outline: none;
                           cursor: pointer;
                           min-width: 200px;
                           border-radius: 1000px;
                           padding: .5em 1em;
                           color: white;
                           text-align: center;
                           font-weight: 500;
                           text-decoration: none;
                           cursor: pointer;
                           transition: background-color 150ms ease-in;
                           border: 1px solid transparent;
       
                           .enabled:active,.enabled:hover {
                               transform: translateY(3px);
                               background-color: white;
                               color: ${DEFAULT_COLOR};
                               border: 1px solid ${DEFAULT_COLOR};
                           }
       
                           .disabled {
                               transition: none;
                               background-color: grey;
                               cursor: initial;
                           }
                       `}</style>
                       </button>
                    )
                }

                const {mainCtaBtnColor} = data.generalSettings;
                return (
                 <button 
                 className={`o_mainCTAButton ${className} ${isActive ? 'active' : 'not-active'}`} 
                 onClick={() => {
                     if(isActive) {
                         return onClick()
                     }
                 }}
                 type="button"
                >
                    {text}
                <style jsx>{`
                    .o_mainCTAButton {
                        border: none;
                        font: inherit;
                        color: inherit;
                        background-color: ${mainCtaBtnColor};
                        outline: none;
                        cursor: pointer;
                        min-width: 200px;
                        border-radius: 1000px;
                        padding: .5em 1em;
                        color: white;
                        text-align: center;
                        font-weight: 500;
                        text-decoration: none;
                        cursor: pointer;
                        transition: background-color 150ms ease-in;
                        border: 1px solid transparent;

                    }

                    .o_mainCTAButton.active:active,.active:hover {
                        transform: translateY(3px);
                        background-color: white;
                        color: ${mainCtaBtnColor};
                        border: 1px solid ${mainCtaBtnColor};
                    }

                    .o_mainCTAButton.not-active {
                        transition: none;
                        background-color: grey;
                        cursor: initial;
                    }
                `}</style>
                </button>
                )
            }}
        </Query>
    )
}

export default MainCTAButton;