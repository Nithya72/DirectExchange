import React, {Component} from "react";

import Automatch from '../../Automatch/automatch.js';
import Header from "../../Navigation/Header";
import SideBar from "../../Navigation/SideBar";

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <SideBar/>

                <div className="content-body">
                    <div className="myContainer">
                        <span className="PageTitle">View All Offers</span>
                        <Automatch/>
                    </div>
                </div>
            </div>
        );
    }
}
