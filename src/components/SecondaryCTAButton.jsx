import {Query} from 'react-apollo';
import gql from 'graphql-tag';

function SecondaryCTAButton({text,onClick,className,isActive}) {
    const DEFAULT_COLOR = 'lightblue';
    return (
        <Query
            query={gql `{
                generalSettings {
                    secondaryCtaBtnColor
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
                        className={`o_secondaryCTAButton ${className} ${isActive ? 'active' : 'not-active'}`} 
                        onClick={() => {
                            if(isActive) {
                                return onClick()
                            }
                        }}
                        type="button"
                       >
                           {text}
                       <style jsx>{`
                           padding: .5em;
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
                           margin: auto;
       
                           .o_secondaryCTAButton.enabled:active, .o_secondaryCTAButton.active:hover {
                               transform: translateY(3px);
                               background-color: white;
                               color: ${DEFAULT_COLOR};
                               border: 1px solid ${DEFAULT_COLOR};
                           }
       
                           .o_secondaryCTAButton.not-active {
                               transition: none;
                               background-color: grey;
                               cursor: initial;
                           }
                       `}</style>
                       </button>
                    )
                }

                const {secondaryCtaBtnColor} = data.generalSettings;
                return (
                 <button 
                 className={`o_secondaryCTAButton ${className} ${isActive ? 'active' : 'not-active'}`} 
                 onClick={() => {
                    if(isActive) {
                        return onClick()
                    }}}
                 type="button"
                >
                    {text}
                <style jsx>{`
                    .o_secondaryCTAButton {
                        padding: .5em;
                        border: none;
                        font: inherit;
                        color: inherit;
                        background-color: ${secondaryCtaBtnColor};
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
                        margin: auto;
                    }

                    .o_secondaryCTAButton.active:active,.o_secondaryCTAButton.active:hover {
                        transform: translateY(3px);
                        background-color: white;
                        color: ${secondaryCtaBtnColor};
                        border: 1px solid ${secondaryCtaBtnColor};
                    }

                    .o_secondaryCTAButton.not-active {
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

export default SecondaryCTAButton;