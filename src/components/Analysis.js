import React, { Component } from 'react'

export class Analysis extends Component {
    render() {
        return (
            <div>
                <p class="lead">Kevyt analyysi datasta.</p>
                <p class="lead">Maksimi lämpötila = 354K = 81C</p>
                <p class="lead">Maksimi käyttöaste = 96.34%</p>
                <p class="lead">Suurin käyttöaste ei tapahtunut samaan aikaan kuin suurin lämpötila. Suurin lämpötila tapahtui 57% käyttöasteella (hetkittäinen jäähdytinongelma?)</p>
                <p class="lead">Keskiverto käyttöasteet 33% paikkeilla, suurimmaksi osaksi lämpötila on lineaarisessa suhteessa käyttöasteen kanssa.</p>
            </div>
        )
    }
}

export default Analysis
