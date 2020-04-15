import React, { useEffect } from 'react';
import config from '../../server/config.js';
import { MapContainer } from './style.js';

const API_KEY = config.map_API_KEY;
console.log('config', API_KEY);

export default function Road(props) {
    const start = props.start;
    const end = props.end;

    useEffect(() => {
        async function getGeoData(pc) {
            const req = await fetch('/')
        };
    }, [])

    console.log('end', end);
    console.log('start', start);

    return (<MapContainer>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d44694.60641115887!2d-73.57270019082291!3d45.56213474387264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x4cc91bdfc283c755%3A0x444366b2980084c5!2sMontr%C3%A9al%2C%20QC%20H2J%203Z4!3m2!1d45.5364734!2d-73.5840108!4m5!1s0x4cc91cced1dd57e1%3A0xcc733654d6a17b7c!2sLongueuil%2C%20QC%20J4G%201R7!3m2!1d45.5655036!2d-73.46907139999999!5e0!3m2!1sfr!2sca!4v1586916034774!5m2!1sfr!2sca"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 'none' }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0">

        </iframe>
    </MapContainer>)
};
