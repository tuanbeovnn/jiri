import React from 'react';
import ContentMain from '../../../components/CyberBugs/Main/ContentMain';
import HeaderMain from '../../../components/CyberBugs/Main/HeaderMain';
import InforMain from '../../../components/CyberBugs/Main/InforMain';
import './../../../index.css';

export default function indexCyberBugs() {
    return (
        <div className="main">
           <HeaderMain/>
            <ContentMain/>
            <InforMain/>
        </div>
    )
}
