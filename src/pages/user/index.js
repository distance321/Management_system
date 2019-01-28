import React, { PureComponent } from 'react';
import { red } from 'ansi-colors';

class User extends PureComponent {
    render() {
        return (
            <div style={{color:red,fontSize:20}}>
                Hello World
            </div>
        );
    }
}


export default User;