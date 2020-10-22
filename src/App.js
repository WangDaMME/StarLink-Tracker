import React from 'react'
import {Layout} from 'antd'
import starLinkLogo from './images/starlink_logo.svg'
import Main from './components/Main';


const {Header, Footer, Content} = Layout;

/* App Component*/
// The main component for the webpage 

function App()
{
    return (
        <Layout>
            <Header>
                <img src={starLinkLogo} className = 'App-logo' alt='logo' />
                <p className="title">StarLink Tracker</p>
            </Header>

            <Content>
                <Main />
            </Content>

            <Footer>
                (c)2020 StarLink Tracker. All Rights Reserved. Website Made by <a href="mailto:wangda.mme@gmail.com">Da WANG</a>. 
            </Footer>

        </Layout>
    );
    
}


export default App;    // export default仅有一个， 模块指定默认输出，这样就不需要知道所要加载模块的变量名，
//Default exports are useful to export only a single object, function, variable. During the import, we can use any name to import.