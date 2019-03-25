/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import MainRoutes from './MainRoutes';
import {withRouter} from 'react-router-dom'

@withRouter
class BasicLayout extends Component {

    render() {

        return (
            <div style={styles.height}>
                <Layout style={styles.height}>
                    <Layout.Main style={styles.height}>
                        <MainRoutes style={styles.height}/>
                    </Layout.Main>
                </Layout>
            </div>
        );
    }
}

const styles = {
    height : {
        height: '100%'
    }
}
export default BasicLayout