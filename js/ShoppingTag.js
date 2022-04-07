class ShoppingTag extends React.Component {
    constructor() {
        super();
       
        this.state = {aktiveGruppe: null}
        this.startzustandLaden()

    }

    /**
     * Hier wird der letzte stand geladen
     */
    async startzustandLaden() {
        let gespeicherterZustand = localStorage.getItem(App.STORAGE_KEY)
        if (gespeicherterZustand) {
            App.laden()
        } else {
            await App.datenEinlesen()
            this.setState(this.state)
        }
    }

    /**
     * Hier wird ein neuer Artikel in die ausgewählte Gruppe hinzugefügt
     */
    artikelHinzufuegen = () => {
        let eingabeFeld = document.getElementById("artikelEingabeFeld")
        if (eingabeFeld.value.trim().length > 0) {
            let gruppe = App.gruppeFinden(App.aktiveGruppe)
            gruppe.artikelHinzufuegen(eingabeFeld.value)
            this.setState(this.state)
        }
        eingabeFeld.value = ""
        eingabeFeld.focus()
    }

    /**
     * Hier wird der hacken gesetzt oder rausgenommen
     * @param artikel - der artikel der gecheckt wird
     */
    artikelChecken = (artikel) => {
        artikel.gekauft = !artikel.gekauft
        App.informieren(artikel.name + " geändert!")
        this.setState(this.state)
    }

    /**
     * Hier wird eine Gruppe auf aktuell gesetzt und ein neuen Artikel hinzuzufügen
     * @param gruppenID 
     */
    setAktiveGruppe = (gruppenID) => {
        App.aktiveGruppe = gruppenID
        this.setState({
            aktiveGruppe: gruppenID
        })
        console.debug(gruppenID)
    }

    render = () => {
        return (
            <div>
                <header>
                    <h1>Einkaufsliste</h1>
                    <nav>
                        <label>
                            <input id="artikelEingabeFeld" type="text" placeholder="Artikel hinzufügen"/>
                        </label>
                        <button className="material-icons" 
                                onClick={() => this.artikelHinzufuegen()}>add_circle
                            <span className="mdc-button__label"></span>
                        </button >
                    </nav>
                </header>
                <hr/>
                <main>
                    <section>
                        <h2>Einzukaufen</h2>
                        <dl>
                            {App.gruppenListe.map(gruppe => (
                                <GruppenTag aktiv={gruppe.id == this.state.aktiveGruppe}
                                            key={gruppe.id} gruppe={gruppe}
                                            erledigt={false} aktiveGruppeHandler={this.setAktiveGruppe}
                                            checkHandler={this.artikelChecken}/>
                            ))}
                        </dl>
                    </section>
                    <hr/>
                    <section>
                        <h2>
                            <dt>Einkaufswagen</dt>
                        </h2>
                        <dl>
                            {App.gruppenListe.map(gruppe => (
                                <GruppenTag aktiv={gruppe.id == this.state.aktiveGruppe}
                                            key={gruppe.id} gruppe={gruppe}
                                            erledigt={true} aktiveGruppeHandler={this.setAktiveGruppe}
                                            checkHandler={this.artikelChecken}/>
                            ))}
                        </dl>
                    </section>
                </main>
                <hr/>
                <footer>
                        <br/>
                </footer>
            </div>
        )
    }
}
