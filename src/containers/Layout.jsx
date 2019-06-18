function Layout(props) {

    return (
        <div id="wrapper">
            <main>
                {props.children}
            </main>
            <style global jsx>{`
                body,html {
                    padding: 0;
                    margin: 0;
                    overflow: hidden;
                }
                main {
                    display: grid;
                    grid-template-columns: 2fr 3fr;
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                }
            `}</style>
        </div>
    )
}

export default Layout;